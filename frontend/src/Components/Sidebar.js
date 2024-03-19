import react, { useState } from "react";
import '../CSS/Sidebar.css';
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
    const [selected, setSelected] = useState("calendar");

    return (
        <div className="sidebar-container">
            <div className="sidebar-grid">
                <SidebarButton type="calendar" selected={selected} setSelected={setSelected}/>
                <SidebarButton type="courses" selected={selected} setSelected={setSelected}/>
                <SidebarButton type="search" selected={selected} setSelected={setSelected}/>
            </div>
        </div>
    )
}