// import '../styles/Dashboard.css';

import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

import DashboardMapListView from './DashboardComponents/DashboardMapListView';
import DashboardMyProfileView from './DashboardComponents/DashboardMyProfileView';
import DashboardCreateOrEditMapView from './DashboardComponents/DashboardCreateOrEditMapView';
import DashboardSearchMapView from './DashboardComponents/DashboardSearchMapView';

import bear from "../assets_img/dashboard_bear.svg";



export default function Dashboard(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle open the selected view screen 
    const openViewScreen = () => {
        auth_store.openViewScreen()
    }

    //Handles changing the selected view.
    const handleSelectedViewChange = (event) => {
        auth_store.openEdit(true)
        setSelectedView(event)
    }
    const handleEditView = () => {
        setSelectedView(<DashboardCreateOrEditMapView />)
    }

    //Stores the currently selected view (Dash Board, My Profile, Create Map, Search Map)
    const [selectedView, setSelectedView] = useState(<DashboardMapListView handleEditView={handleEditView}/>);

    return (
        <div className='container'>
            <div className='sidebar'>
            <img className="bear" src={bear} style={{padding:"30px 0px"}}alt="My SVG" />
                <div className='profile'>Hello {auth_store.user.username}</div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardMapListView handleEditView={handleEditView}/>)}>Dashboard</button>
                </div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardMyProfileView />)}>My Profile</button>
                </div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardCreateOrEditMapView />)}>Create Map</button>
                </div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardSearchMapView />)}>Search Map</button>
                </div>
            </div>
            <div className='selectedDashbord' style={{overflowX: "hidden"}}>{selectedView}</div>
        </div>

    )

}