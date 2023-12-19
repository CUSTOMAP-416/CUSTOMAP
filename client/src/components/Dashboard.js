// import '../styles/Dashboard.css';
import React from 'react';

import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

import DashboardMapListView from './DashboardComponents/DashboardMapListView';
import DashboardMyProfileView from './DashboardComponents/DashboardMyProfileView';
import DashboardCreateOrEditMapView from './DashboardComponents/DashboardCreateOrEditMapView';
import DashboardSearchMapView from './DashboardComponents/DashboardSearchMapView';

import bear from "../assets_img/dashboard_bear.svg";



export default function Dashboard(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //Handles changing the selected view.
    const handleSelectedViewChange = (newView,viewType) => {
        auth_store.openEdit(true);
        setSelectedView(React.cloneElement(newView, { isDarkMode: !isDarkMode })); 
        setCurrentViewType(viewType);
    }
    const handleEditView = () => {
        setSelectedView(<DashboardCreateOrEditMapView />)
    }

    //Stores the currently selected view (Dash Board, My Profile, Create Map, Search Map)
    
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        simulateButtonClick();
    };

    const simulateButtonClick = () => {
        const refreshButton = document.getElementById('refreshButton');
        if (refreshButton) {
            refreshButton.click();
        }
    };
    
    const [refreshCount,setRefreshCount] = useState(0);
    const handleRefresh = () => {
        setRefreshCount(prevCount => prevCount + 1);
        setSelectedView(getSelectedView(currentViewType));
    };

    const getSelectedView = (viewType) => {
        switch (viewType) {
            case 'dashboard':
                console.log("dashboard")
                
                return <DashboardMapListView handleEditView={handleEditView} isDarkMode={isDarkMode} />;

            case 'profile':
                
                return <DashboardMyProfileView isDarkMode={isDarkMode} />;
            case 'creat':
                console.log("creat")
                return <DashboardCreateOrEditMapView isDarkMode={isDarkMode} />;
            case 'search':
                console.log("search")
                return <DashboardSearchMapView isDarkMode={isDarkMode}/>;
            
            default:
                console.log("start")
                
                return <DashboardMapListView handleEditView={handleEditView} isDarkMode={isDarkMode} />;
                
        }
    };

    const [currentViewType,setCurrentViewType] = useState('dashboard');
    const [selectedView, setSelectedView] = useState(getSelectedView(currentViewType));
    
      
    return (
        
        <div className='container'>
            <div className={`sidebar ${isDarkMode ? 'sidebar-dark' : 'sidebar-bright'}`}>
                <div className="darkmodebutton">
                    <span className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`} style={{fontSize:'15px'}}>Dark Mode</span>
                    <label className="switch" id="switch">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={handleToggle}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            <img className="bear" src={bear} style={{padding:"20px 10px 0px"}}alt="My SVG" />
                <div className={`profile ${isDarkMode ? 'profile-dark' : ''}`}>Hello {auth_store.user?auth_store.user.username:''}</div>
                <div className="sidebar-buttons">
                    <button
                        className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`} id='dashboardbutton'
                        onClick={() => handleSelectedViewChange(<DashboardMapListView handleEditView={handleEditView} isDarkMode={isDarkMode} />,'dashboard')}>Dashboard</button>
                </div>
                <div className="sidebar-buttons">
                    <button
                        className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`} id='profilebutton'
                        onClick={() => handleSelectedViewChange(<DashboardMyProfileView isDarkMode={isDarkMode} />,'profile')}>My Profile</button>
                </div>
                <div className="sidebar-buttons">
                    <button
                        className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`} 
                        onClick={() => handleSelectedViewChange(<DashboardCreateOrEditMapView isDarkMode={isDarkMode}/>,'creat')}>Create Map</button>
                </div>
                <div className="sidebar-buttons">
                    <button
                        className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`}
                        onClick={() => handleSelectedViewChange(<DashboardSearchMapView isDarkMode={isDarkMode}/>,'search')}>Search Map</button>
                </div>
                <button id='refreshButton'onClick={handleRefresh} style={{display:'none'}}>refresh</button>
            </div>
            <div className={`selectedDashboard ${isDarkMode ? 'selectedDashbord-dark' : 'selectedDashbord'}`} style={{ overflowX: "hidden" }}> {React.cloneElement(selectedView, { key: refreshCount })}</div>
        </div>
           

    )

}