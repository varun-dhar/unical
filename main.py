import ratemyprofessor
from sanic import Sanic
import sanic
from sanic.response import text
import statistics

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


async def make_rating(professor, course, rating_weight=1, difficulty_weight=1, take_again_weight=1):
    course_ratings = (statistics.mean(map(lambda x: x.rating, professor.get_ratings(course)))) / 5 * rating_weight
    course_difficulty = (statistics.mean(
        map(lambda x: x.rating, professor.get_difficulty(course)))) / 5 * difficulty_weight
    course_take_again = statistics.mean(map(lambda x: x.rating, professor.get_take_again(course))) * take_again_weight
    return (course_ratings + course_difficulty + course_take_again) / 3
