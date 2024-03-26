import React from "react";
import '../CSS/Prof.css';

export default function ProfInfoScoreDisplay(props) {
    return (
        <div className="prof-info-score-display-container">
            <p>{props.prof["overall_rating"]}</p>
        </div>
    )
}