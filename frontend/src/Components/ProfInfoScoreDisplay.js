import React from "react";
import '../CSS/Prof.css';

export default function ProfInfoScoreDisplay(props) {
    return (
        <div className="prof-info-score-display-container">
            <p>{Math.round((props.prof["overall_rating"] + Number.EPSILON) * 100) / 100}</p>
        </div>
    )
}