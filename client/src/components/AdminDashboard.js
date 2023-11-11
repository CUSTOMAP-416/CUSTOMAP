import '../styles/AdminDashboard.css';

import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

import AdminDashboardUserList from './AdminDashboardComponents/AdminDashboardUserList';
import AdminDashboardMapList from './AdminDashboardComponents/AdminDashboardMapList';

import user from "../assets_img/adminDashboard_user.svg";
import adminBear from "../assets_img/adminDashboard_bear.svg";
import arrow from "../assets_img/dashboard_arrow.svg";

export default function AdminDashboard(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle open the selected view screen 
    const openAdminViewScreen = () => {
        auth_store.openAdminViewScreen()
    }

    //'User List', 'Map List' 
    const [selectedView, setSelectedView] = useState(<AdminDashboardUserList/>);

    //Handles changing the selected view change. 
    const handleSelectedViewChange = (event) => {
        setSelectedView(event)
    }

    return (
        <div>
            <div className = "whole-body">
            <div className='sidebar'>
            <img className="admin-bear" src={adminBear} style={{padding:"30px 0px"}}alt="My SVG" />
                <div className='profile'>Hello, Admin</div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<AdminDashboardUserList/>)}>User List</button>
                </div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<AdminDashboardMapList/>)}>Map List</button>
                </div>
            </div>
            <div className='right-body'>
            <div className="admin-header">
                <h1 className='header-font'>Admin Dashboard</h1>
            </div>
            <div class="user-list">
                <div className='sort-buttons'>
                    <button className='arrow-button'><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button">Ascending</button>
                    <button className='arrow-button'><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button">Descending</button>
                    <button className='arrow-button'><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button">Date</button>
                </div>
                <div class="user-item">
                <div style={{display: "flex", alignItems: "center"}}> 
                <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
                    <span>User Name 1</span></div>
                    <div>
                        <button className="map">Map</button>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
                <div className="user-item">
                <div style={{display: "flex", alignItems: "center"}}> 
                <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
                    <span>User Name 2</span></div>
                    <div>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
                <div className="user-item">
                    <div style={{display: "flex", alignItems: "center"}}> 
                <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
                    <span>User Name 3</span>
                    </div>
                    <div>
                        
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        {/* {selectedView} */}
        </div>
    )
}