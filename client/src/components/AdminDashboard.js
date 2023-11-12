

import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

import AdminDashboardUserList from './AdminDashboardComponents/AdminDashboardUserList';
import AdminDashboardMapList from './AdminDashboardComponents/AdminDashboardMapList';

import adminBear from "../assets_img/adminDashboard_bear.svg";


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
            <div className = "container">
            <div className='sidebar'>
            <img className="admin-bear" src={adminBear} style={{padding:"30px 0px"}} alt="My SVG" />
                <div className='profile'>Hello, Admin</div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<AdminDashboardUserList/>)}>User List</button>
                </div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<AdminDashboardMapList/>)}>Map List</button>
                </div>
            </div>
            
            </div>
        {selectedView}
        </div>
    )
}