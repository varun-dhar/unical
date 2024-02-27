import ratemyprofessor
from sanic import Sanic
import sanic 
from sanic.response import text
import statistics
from pymongo import MongoClient
from bs4 import BeautifulSoup 
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pandas as pd
from selenium.webdriver.common.by import By
import time
from selenium.webdriver import ActionChains
from pymongo.server_api import ServerApi

ABC = ["A","B",'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

school  = ratemyprofessor.get_school_by_name("Northeastern University")
app = Sanic("app")
@app.get("/api/getCourseData")
async def get_course_data(request: sanic.Request):
    if request.form is None or request.form.get("courses[]") is None or len(request.form.get("courses[]")) == 0:
        return sanic.response.empty(status = 400)
    courses = request.form.get("courses[]")



def find_prof_ratings(prof_name):
    core = ratemyprofessor.get_professor_by_school_and_name(school, prof_name)
    try:
        core  = list(map(lambda x: x.name,core.courses))
        new_core = []
        
        for x in range(len(core)):
            numbers = sum(c.isdigit() for c in core[x])
            for y in range(len(ABC)):
                if core[x].__contains__(ABC[y]) and numbers == 4:
                    new_core.append(core[x])
                    break
        print(new_core)
        
        lst = []
        for y in range(len(new_core)):
            professor = (ratemyprofessor.get_professor_by_school_and_name(school, prof_name)).get_ratings(new_core[y])
            rating_total = [professor[x].rating for x in range(len(professor))]
            difficulty_total = [professor[x].difficulty for x in range(len(professor))]
            take_again_total = [professor[x].take_again for x in range(len(professor))]
            p = {"course" : new_core[y], "rating": rating_total, "difficulty": difficulty_total, "take_again": take_again_total}
            lst.append(p)
        #prof_rater = make_ratings(professor, 1,1,1 )
        #print(prof_name, "has a rating of", prof_rater)
    except:
        pass   

    return lst
        



def get_pro():
        professor_list = []
        driver = webdriver.Chrome()
        driver.get('https://www.ratemyprofessors.com/search/professors/696?q=*')
        while True:
            try:       
                show_more = driver.find_element(By.CLASS_NAME, "eUNaBX")
                driver.execute_script("arguments[0].click();", show_more)
                time.sleep(1)
            except:
                break
        print(len(professor_list))
        vegetable = driver.find_elements(By.CLASS_NAME, "cJdVEK")   
        print(vegetable)
        #r = requests.get('https://www.ratemyprofessors.com/search/professors/696?q=*')
        for e in vegetable:
            print(e.text)
            professor_list.append(e.text)

        
        mydct = {}
        for x in range(len(professor_list)):
            mydct[professor_list[x]] = find_prof_ratings(professor_list[x])  
            
        #mydct is info

def main():
    get_pro()

main()
