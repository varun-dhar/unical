import asyncio
import re
import os
import statistics

import aiohttp
import dotenv
import motor.motor_asyncio
import pymongo
import gql, gql.transport.aiohttp

course_re = re.compile('^([A-Z]{2}|[A-Z]{4})([0-9]{4})$')


async def azip(coro, item):
	return await coro, item


async def run_scrape():
	db_client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGODB_URL'), tls=True,
													   tlsCertificateKeyFile='../' + os.getenv('MONGODB_CERT'),
													   io_loop=asyncio.get_event_loop())
	db = db_client['test']
	await scrape_graphql(db)


def get_prof_ratings(prof, record: dict):
	record.setdefault('overall_rating', 0)
	record.setdefault('overall_difficulty', 0)
	record.setdefault('percent_take_again', 0)
	record.setdefault('n_ratings', 0)
	record.setdefault('ratings', {})

	manual_overall_rating = []
	manual_overall_difficulty = []
	manual_percent_take_again = []
	manual_n_ratings = 0
	for class_rating in prof['ratings']['edges']:
		for _, rating in class_rating.items():
			manual_overall_rating.append(rating['qualityRating'])
			manual_overall_difficulty.append(rating['difficultyRatingRounded'])
			if rating['wouldTakeAgain'] is not None:
				manual_percent_take_again.append(rating['wouldTakeAgain'])
		manual_n_ratings += len(class_rating)
	manual_overall_rating = statistics.mean(manual_overall_rating) if len(manual_overall_rating) != 0 else 0
	manual_overall_difficulty = statistics.mean(manual_overall_difficulty) if len(manual_overall_difficulty) != 0 else 0
	manual_percent_take_again = statistics.mean(manual_percent_take_again) if len(manual_percent_take_again) != 0 else 0

	ratings = list(
		filter(lambda x: course_re.match(x['class']), map(lambda x: x['node'], prof['ratings']['edges'])))
	classes = {}
	for rating in ratings:
		if rating['class'] not in classes:
			classes[rating['class']] = []
		classes[rating['class']].append(rating)
	for class_name, rating_list in classes.items():
		difficulty = 0
		quality = 0
		take_again = []
		for rating in rating_list:
			difficulty += rating['difficultyRatingRounded']
			quality += rating['qualityRating']
			if rating['wouldTakeAgain'] is not None:
				take_again.append(rating['wouldTakeAgain'])
		n_ratings = len(rating_list)
		if class_name in record['ratings']:
			n_ratings += record['ratings'][class_name]['n_ratings']
			quality += record['ratings'][class_name]['rating']
			difficulty += record['ratings'][class_name]['difficulty']
			take_again.append(record['ratings'][class_name]['take_again'])
		difficulty /= n_ratings
		quality /= n_ratings
		take_again = statistics.mean(take_again) if len(take_again) != 0 else 0
		classes[class_name] = {'rating': quality, 'difficulty': difficulty, 'n_ratings': n_ratings,
							   'take_again': take_again}
	n_ratings = len(ratings) + record['n_ratings']
	if n_ratings > 0:
		overall_rating = (prof['avgRatingRounded'] * len(ratings) + record['overall_rating'] * record[
			'n_ratings']) / n_ratings
		overall_rating = overall_rating if overall_rating != 0 else manual_overall_rating
		overall_difficulty = (prof['avgDifficultyRounded'] * len(ratings) + record['overall_difficulty'] *
							  record['n_ratings']) / n_ratings
		overall_difficulty = overall_difficulty if overall_difficulty != 0 else manual_overall_difficulty
		percent_take_again = (prof['wouldTakeAgainPercentRounded'] * len(ratings) + record['percent_take_again'] *
							  record['n_ratings']) / n_ratings
		percent_take_again = percent_take_again if percent_take_again != 0 else manual_percent_take_again
		n_ratings = n_ratings if n_ratings != 0 else manual_n_ratings
		return overall_rating, overall_difficulty, percent_take_again, n_ratings, classes
	return 0, 0, 0, 0, {}


async def scrape_graphql(db: motor.motor_asyncio.AsyncIOMotorDatabase):
	transport = gql.transport.aiohttp.AIOHTTPTransport(url='https://www.ratemyprofessors.com/graphql',
													   auth=aiohttp.BasicAuth('test', password='test'))
	client = gql.Client(transport=transport, fetch_schema_from_transport=True)
	manual = {}
	async with client as session:
		query = gql.gql('''
        query NewSearchSchoolsQuery($text: String!) {
              newSearch {
                schools(query: {text: $text}) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
        ''')
		results = await session.execute(query, variable_values={'text': 'Northeastern University'},
										extra_args={'auth': aiohttp.BasicAuth('test', password='test')})
		edges = results['newSearch']['schools']['edges']
		if len(edges) == 0:
			return
		school_id = edges[0]['node']['id']

		cursor = ''
		while True:
			teacher_query = gql.gql('''
            query NewSearchTeachersQuery($text: String!, $schoolID: ID!, $after: String!) {
                  newSearch {
                    teachers(query: {text: $text, schoolID: $schoolID}, after: $after) {
                      pageInfo {
                        endCursor
                      }
                      edges {
                        node {
                          firstName
                          lastName
                          ratings {
                            edges {
                                node {
                                    class
                                    difficultyRatingRounded
                                    qualityRating
                                    wouldTakeAgain
                                }
                            }
                          }
                          avgDifficultyRounded
                          avgRatingRounded
                          wouldTakeAgainPercentRounded
                        }
                      }
                    }
                  }
                }
            ''')
			search_results = await session.execute(teacher_query, variable_values={'text': '', 'schoolID': school_id,
																				   'after': cursor})
			cursor = search_results['newSearch']['teachers']['pageInfo']['endCursor']
			profs = list(map(lambda x: x['node'], search_results['newSearch']['teachers']['edges']))
			if len(profs) == 0:
				break
			updates = []
			for coro in asyncio.as_completed(
					map(lambda prof: azip(
						db['profs'].find_one({'$or': [{'firstName': prof["firstName"].strip(),
													   'lastName': prof["lastName"].strip()},
													  {
														  'aliases': f'{prof["firstName"].strip()} {prof["lastName"].strip()}'}]},
											 {'name': 1, 'n_ratings': 1, 'overall_difficulty': 1,
											  'overall_rating': 1, 'percent_take_again': 1, 'ratings': 1, '_id': 0}),
						prof),
						profs)):
				record, prof = await coro
				if record is None:
					manual.setdefault(f'{prof["firstName"].strip()} {prof["lastName"].strip()}', prof)
					continue

				overall_rating, overall_difficulty, percent_take_again, n_ratings, ratings = get_prof_ratings(prof,
																											  record)
				if n_ratings == 0:
					continue
				updates.append(pymongo.UpdateOne({'name': record['name']}, {'$set': {'overall_rating': overall_rating,
																					 'overall_difficulty': overall_difficulty,
																					 'percent_take_again': percent_take_again,
																					 'n_ratings': n_ratings,
																					 'ratings': ratings}}))
			if len(updates) > 0:
				await db['profs'].bulk_write(updates)

	scores = []
	updates = []
	for rmp_prof_name, prof in manual.items():
		prof_record = None
		async for record in db['profs'].aggregate(
				[{'$search': {'index': 'prof_name', 'text': {'path': 'name', 'query': rmp_prof_name, 'fuzzy': {}}}},
				 {'$project': {'_id': 0, 'name': 1, 'n_ratings': 1, 'overall_difficulty': 1,
							   'overall_rating': 1, 'percent_take_again': 1, 'ratings': 1, 'aliases': 1,
							   'score': {'$meta': "searchScore"}}},
				 {'$limit': 10}]):
			if record['score'] < 6:
				break
			scores.append(record['score'])
			response = ''
			while response not in ('Y', 'N', 'C'):
				print(
					f'Got: {prof["firstName"]} {prof["lastName"]}\nDid you mean: {record["name"]}? (Y/N) (Cancel: C)')
				response = input()
			if response == 'Y':
				prof_record = record
				break
			if response == 'C':
				break
		if prof_record is None:
			continue
		overall_rating, overall_difficulty, percent_take_again, n_ratings, ratings = get_prof_ratings(prof, prof_record)
		updates.append(pymongo.UpdateOne({'name': prof_record['name']}, {'$set': {'overall_rating': overall_rating,
																				  'overall_difficulty': overall_difficulty,
																				  'percent_take_again': percent_take_again,
																				  'n_ratings': n_ratings,
																				  'ratings': ratings,
																				  'aliases': prof_record.get('aliases',
																											 []) + [
																								 f'{prof["firstName"]} {prof["lastName"]}']}}))
	if len(updates) > 0:
		await db['profs'].bulk_write(updates)
	if len(scores) > 0:
		print(statistics.mean(scores))


if __name__ == '__main__':
	dotenv.load_dotenv()
	asyncio.run(run_scrape())
