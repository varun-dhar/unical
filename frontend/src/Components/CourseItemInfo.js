import React from "react";

export default function CourseItemInfo(props) {
    return (
        <div className="course-item-info-container">
            <div className="course-item-info-type-time">
                <p>{props.course["classType"]} | </p>
                <h1>{props.course["classTimes"][0]["start"]} - {props.course["classTimes"][0]["end"]}</h1>
            </div>

            <div className="course-item-info-credits-location">
                <p>{props.course["credits"]} Credits | </p>
                <h1>{props.course["classTimes"][0]["location"]}</h1>
            </div>
        </div>
    )
}