import React, { useEffect, useState } from "react";
import '../CSS/Course.css';
import CourseItemHeader from "./CourseItemHeader";
import CourseItemInfo from "./CourseItemInfo";
import ProfInfo from "./ProfInfo";
import CourseDates from "./CourseDates";

export default function CourseItem() {
    const [course, setCourse] = useState({});
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        setCourse(
            {
                "termID": "202430",
                "subject": "ACCT",
                "classID": "1201",
                "crn": "40608",
                "classType": "Lecture",
                "credits": 4,
                "classTimes": [
                    {
                        "day": "M",
                        "start": "01:35 PM",
                        "end": "02:40 PM",
                        "location": "Richards Hall 458"
                    },
                    {
                        "day": "W",
                        "start": "01:35 PM",
                        "end": "02:40 PM",
                        "location": "Richards Hall 458"
                    },
                    {
                        "day": "R",
                        "start": "01:35 PM",
                        "end": "02:40 PM",
                        "location": "Richards Hall 458"
                    }
                ],
                "prof": {
                    "name": "Benjamin Hescott",
                    "n_ratings": 10,
                    "overall_difficulty": 3.8,
                    "overall_rating": 4.2,
                    "percent_take_again": 77.80000000000001,
                    "ratings": {}
                },
            }
        );

        setInitialized(true);
    }, []);

    return (
        <div className="course-item-element">
            { initialized &&
                <div className="course-item-element-container">
                    <CourseItemHeader course={course}/>
                    <CourseItemInfo course={course}/>
                    <ProfInfo prof={course["prof"]}/>
                    <CourseDates classTimes={course["classTimes"]}/>
                </div>
            }
        </div>
    )
}