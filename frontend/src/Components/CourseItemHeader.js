import React from "react";
import '../CSS/Course.css';

export default function CourseItemHeader(props) {
    return (
        <div className="course-item-header-container">
            <div className="course-item-header-text">
                <h1>{props.course["subject"]}{props.course["classID"]}-01</h1>
                <p>CRN {props.course["crn"]}</p>
            </div>

            <div className="course-item-header-info-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/>
                </svg>
            </div>
        </div>
    )
} 