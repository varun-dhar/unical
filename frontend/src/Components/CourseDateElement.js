import React from "react";
import '../CSS/Course.css';

export default function CourseDateElement(props) {
    const dateElementStyle = {
        backgroundColor: Object.keys(props.class).length > 0 ? "var(--main-blue)" : ""
    };

    return (
        <div className="course-date-element-container" style={dateElementStyle}>
            <p>{props.date}</p>
        </div>
    )
}