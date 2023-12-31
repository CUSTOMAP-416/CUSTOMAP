

import { useState } from 'react';

import AdminDashboardUserList from './AdminDashboardComponents/AdminDashboardUserList';
import AdminDashboardMapList from './AdminDashboardComponents/AdminDashboardMapList';

import adminBear from "../assets_img/adminDashboard_bear.svg";


export default function AdminDashboard(){
    //'User List', 'Map List' 
    const [selectedView, setSelectedView] = useState(<AdminDashboardUserList/>);

    //Handles changing the selected view change. 
    const handleSelectedViewChange = (event) => {
        setSelectedView(event)
    }

    return (
        // <div style={{display: "flex"}}>
            <div className = "container">
                <div className='sidebar'>
                    <img className="admin-bear" src={adminBear} style={{padding:"30px 0px"}} alt="My SVG" />
                    <div className='profile'>Hello, Admin</div>
                    <div className="sidebar-buttons">
                        <button className="sidebar-buttons" type="button" onClick={() => handleSelectedViewChange(<AdminDashboardUserList/>)}>User List</button>
                    </div>
                    <div className="sidebar-buttons">
                        <button className="sidebar-buttons" type="button" onClick={() => handleSelectedViewChange(<AdminDashboardMapList/>)}>Map List</button>
                    </div>
                </div>
                {selectedView}
            </div>
        
        // </div>
    )
}