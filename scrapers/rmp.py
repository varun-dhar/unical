import asyncio
import re
import os

import dotenv
import motor.motor_asyncio
import pymongo
import ratemyprofessor

course_re = re.compile('^([A-Z]+)([0-9]+)$')


async def get_ratings(school, name):
	loop = asyncio.get_event_loop()
	prof: ratemyprofessor.Professor = await loop.run_in_executor(None, ratemyprofessor.get_professor_by_school_and_name,
																 school, name)
	if prof is None:
		return name, -1, -1, []
	lst = []
	per_course_ratings = {}
	for course in prof.courses:
		match = course_re.match(course.name)
		if not match:
			continue
		per_course_ratings[match.group(0)] = []

	all_course_ratings = await loop.run_in_executor(None, prof.get_ratings)
	for course_rating in all_course_ratings:
		if course_rating.class_name in per_course_ratings:
			per_course_ratings[course_rating.class_name].append(course_rating)

	overall_rating = 0
	overall_difficulty = 0
	for course_name, course_ratings in per_course_ratings.items():
		rating = 0
		difficulty = 0
		take_again = 0
		n_take_again = 0
		for course_rating in course_ratings:
			rating += course_rating.rating
			difficulty += course_rating.difficulty
			if course_rating.take_again is not None:
				take_again += course_rating.take_again
				n_take_again += 1
		if len(course_ratings) > 0:
			rating /= len(course_ratings)
			difficulty /= len(course_ratings)
		else:
			rating = -1
			difficulty = -1
		if n_take_again > 0:
			take_again /= n_take_again
		else:
			take_again = -1
		p = {"course": course_name, "rating": rating, "difficulty": difficulty,
			 "take_again": take_again}
		lst.append(p)

		overall_rating += rating
		overall_difficulty += difficulty

	if len(per_course_ratings) > 0:
		overall_rating /= len(per_course_ratings)
		overall_difficulty /= len(per_course_ratings)
	else:
		overall_rating = -1
		overall_difficulty = -1
	return name, overall_rating, overall_difficulty, lst


async def scrape_rmp(db: motor.motor_asyncio.AsyncIOMotorDatabase):
	school = await asyncio.get_event_loop().run_in_executor(None, ratemyprofessor.get_school_by_name,
															"Northeastern University")
	rating_tasks = []
	async for prof in db['employees'].find({}, {'name': 1, '_id': 0}):
		rating_tasks.append(asyncio.create_task(get_ratings(school, prof['name'])))

	updates = []
	for coro in asyncio.as_completed(rating_tasks):
		name, overall_rating, overall_difficulty, ratings = await coro
		updates.append(pymongo.UpdateOne({'name': name}, {'$set': {'overall_rating': overall_rating,
																		   'overall_difficulty': overall_difficulty,
																		   'ratings': ratings}}))
		if len(updates) > 100:
			await db['employees'].bulk_write(updates, ordered=False)
			updates.clear()
			print('wrote 100 records')


async def run_scrape():
	db_client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGODB_URL'), tls=True,
													   tlsCertificateKeyFile=os.getenv('MONGODB_CERT'),
													   io_loop=asyncio.get_event_loop())
	db = db_client['test']
	await scrape_rmp(db)


if __name__ == '__main__':
	dotenv.load_dotenv()
	s = ratemyprofessor.get_school_by_name('Northeastern University')
	asyncio.run(run_scrape())
