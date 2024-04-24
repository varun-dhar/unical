import React from "react";
import '../CSS/SelectionPanel.css';
import SelectionPanelHeader from "./SelectionPanelHeader";
import CourseItemList from "./CourseItemList";

export default function SelectionPanel() {
    return (
        <div className="selection-panel-container">
            <SelectionPanelHeader/>
            <CourseItemList/>
        </div>
    )
}