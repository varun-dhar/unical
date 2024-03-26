import React from "react";
import CourseDateElement from "./CourseDateElement";
import '../CSS/Course.css';

export default function CourseDates(props) {
    return (
        <div className="course-dates-container">
            {
                ["S", "M", "T", "W", "R", "F", "Sa"].map((item, key) => {
                    return <CourseDateElement key={key} date={item} class={getDate(item, props.classTimes)}/>
                })
            }
        </div>
    )
}

function getDate(date, classTimes) {
    for(var i = 0; i < classTimes.length; i++) {
        if(date === classTimes[i]["day"]) {
            return classTimes[i];
        }
    }

    return {};
}