import ratemyprofessor
from sanic import Sanic
import sanic
from sanic.response import text
import statistics
import json

school = ratemyprofessor.get_school_by_name("Northeastern University")
app = Sanic("app")


@app.get("/api/getCourseData")
async def get_course_data(request: sanic.Request):
    if request.form is None or request.form.get("courses[]") is None or len(request.form.get("courses[]")) == 0:
        return sanic.response.empty(status=400)
    courses = request.form.get("courses[]")


"""
Get banner api to get course name, prof...
"""


async def find_prof_ratings(courses):
    professor = ratemyprofessor.get_professor_by_school_and_name(school, courses["prof"])

    if professor is not None:
        print("%sworks in the %s Department of %s." % (professor.name, professor.department, professor.school.name))
        print("Rating: %s / 5.0" % professor.rating)
        print("Difficulty: %s / 5.0" % professor.difficulty)
        print("Total Ratings: %s" % professor.num_ratings)
        rate = list(map(lambda x: x.name, professor.courses))
        print(statistics.mean(map(lambda x: x.rating, professor.get_ratings("MATH1365"))))
        if professor.would_take_again is not None:
            print(("Would Take Again: %s" % round(professor.would_take_again, 1)) + '%')
        else:
            print("Would Take Again: N/A")


def make_ratings(file, professor, course, rating_weight = 1 , difficulty_weight  = 1, take_again_weight = 1):
    """Only applies if user wants the course to be easy"""
    f = open(file,"r")
    data = json.load(f)

    for x in range(len(data)):
        if data[x]["course"] == course:
            course_rating = (data[x]["rating"])/5 * rating_weight
            course_difficulty = (data[x]["difficulty"])/5 * difficulty_weight
            course_take_again = (data[x]["take_again"])/5 * take_again_weight
            return (course_rating + course_difficulty + course_take_again)/3