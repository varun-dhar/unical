import React from "react";
import '../CSS/SelectionPanel.css';
import SelectionPanelHeader from "./SelectionPanelHeader";
import CourseItem from "./CourseItem";

export default function SelectionPanel() {
    return (
        <div className="selection-panel-container">
            <SelectionPanelHeader/>
            <CourseItem/>
        </div>
    )
}