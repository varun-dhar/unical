import React from "react";
import ProfInfoScoreDisplay from "./ProfInfoScoreDisplay";

export default function ProfInfo(props) {
    return (
        <div className="prof-info-container">
            <p className="prof-name">{props.prof["name"]}</p>
            <ProfInfoScoreDisplay prof={props.prof}/>
        </div>
    )
}