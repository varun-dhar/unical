import re
import asyncio

import sanic

course_re = re.compile('^([A-Z]{2}|[A-Z]{4})([0-9]{4})$')
n_to_day = ['S', 'M', 'T', 'W', 'R', 'F', 'S']

bp = sanic.Blueprint('api')


async def azip(coro, item):
	return await coro, item


@bp.post('/api/getCourseData')
async def get_course_data(request: sanic.Request):
	if request.json is None or any(
			element not in request.json for element in ("courses", 'termId', 'campus', 'honors')) is None or len(
		request.json.get("courses")) == 0:
		return sanic.response.empty(status=400)
	courses = request.json.get("courses")
	term_id = request.json.get('termId')
	campus = request.json.get('campus')

	honors_filter = {'honors': False} if not request.json.get('honors') else {}

	matches = [course_re.match(course.strip()) for course in courses]
	if any(not match for match in matches):
		return sanic.response.text('Course format invalid', status=400)

	course_ids = set()
	coreq_results = []
	for match in matches:
		subject = match.group(1)
		class_id = match.group(2)
		course_ids.add((subject, class_id))
		coreq_results.append(request.app.ctx.db['classes'].find_one({'subject': subject,
																	 'classId': class_id,
																	 'termId': term_id
																	 },
																	{'coreqs': 1, '_id': 0}))
	for coro in asyncio.as_completed(coreq_results):
		coreqs = await coro
		if coreqs is None:
			continue
		for coreq in coreqs['coreqs']['values']:
			course_ids.add((coreq['subject'], coreq['classId']))

	course_data = {}
	for coro in asyncio.as_completed(map(lambda course_id:
										 azip(request.app.ctx.db['sections'].find({'subject': course_id[0],
																				   'classId': course_id[1],
																				   'termId': term_id,
																				   'campus': campus,
																				   '$or': [
																					   {'seatsRemaining': {'$gt': 0}},
																					   {'waitRemaining': {
																						   '$gt': 0}}]} | honors_filter,
																				  {'crn': 1,
																				   'waitRemaining': 1,
																				   'seatsRemaining': 1,
																				   'profs': 1,
																				   'meetings': 1,
																				   'classType': 1,
																				   '_id': 0
																				   }).to_list(None),
											  course_id),
										 course_ids)):
		sections, course_id = await coro
		name = ''.join(course_id)

		if len(sections) == 0:
			continue

		course_record = await request.app.ctx.db['classes'].find_one({'subject': course_id[0], 'classId': course_id[1]},
																	 {'maxCredits': 1, 'nupath': 1, '_id': 0})
		course_data[name] = {'sections': [], 'credits': course_record['maxCredits'], 'nupath': course_record['nupath']}
		for section in sections:
			section_data = {'crn': section['crn'], 'seatsRemaining': section['seatsRemaining'],
							'waitRemaining': section['waitRemaining'], 'profs': [], 'classType': section['classType'],
							'classTimes': [], 'examTimes': []}
			for prof in section['profs']:
				record = await request.app.ctx.db['profs'].find_one({'name': prof},
																	{'_id': 0, 'name': 1,
																	 'overall_rating': 1,
																	 'overall_difficulty': 1,
																	 'percent_take_again': 1,
																	 'n_ratings': 1,
																	 'ratings': 1})
				if record is None or 'ratings' not in record:
					continue
				record['course_rating'] = record['ratings'].get(name, {})
				del record['ratings']
				section_data['profs'].append(record)
			for meeting in section['meetings']:
				for day, time in meeting['times'].items():
					day = n_to_day[int(day)]
					time = time[0]
					meeting_time = {'day': day,
									'start': time['start'],
									'end': time['end'],
									'location': meeting['where']}
					if meeting['type'] == 'Class':
						section_data['classTimes'].append(meeting_time)
					elif meeting['type'] == 'Final Exam':
						section_data['examTimes'].append(meeting_time)

			course_data[name]['sections'].append(section_data)

	course_data['original_request'] = courses
	return sanic.response.json(course_data)
