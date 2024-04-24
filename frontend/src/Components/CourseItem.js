import React, { useEffect, useState } from "react";
import '../CSS/Course.css';
import CourseItemHeader from "./CourseItemHeader";
import CourseItemInfo from "./CourseItemInfo";
import ProfInfo from "./ProfInfo";
import CourseDates from "./CourseDates";

export default function CourseItem(props) {
    const [course, setCourse] = useState({});
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        console.log(props.course);
        setCourse(props.course);
        setInitialized(true);
    }, [props.course]);

    return (
        <div className="course-item-element">
            { initialized &&
                <div className="course-item-element-container">
                    <CourseItemHeader course={course}/>
                    <CourseItemInfo course={course}/>
                    {course["profs"].length > 0 && <ProfInfo prof={course["profs"][0]}/>}
                    <CourseDates classTimes={course["classTimes"]}/>
                </div>
            }
        </div>
    )
}