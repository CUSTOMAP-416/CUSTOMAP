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

    //function to handle open the selected view screen 
    const openViewScreen = () => {
        auth_store.openViewScreen()
    }

    //Handles changing the selected view.
    const handleSelectedViewChange = (newView,viewType) => {
        auth_store.openEdit(true)
        setSelectedView(newView)
        setCurrentViewType(viewType);
        
        
    }
    const handleEditView = () => {
        setSelectedView(<DashboardCreateOrEditMapView />)
    }

    //Stores the currently selected view (Dash Board, My Profile, Create Map, Search Map)
    
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        
    };
    

    const [refreshCount,setRefreshCount] = useState(0);
    const handleRefresh = () => {
        setRefreshCount(prevCount => prevCount + 1);
        setSelectedView(getSelectedView(currentViewType));
    };

    const getSelectedView = (viewType) => {
        switch (viewType) {
            case 'dashboard':
                
                return <DashboardMapListView handleEditView={handleEditView} isDarkMode={isDarkMode} />;
            case 'profile':
                
                return <DashboardMyProfileView isDarkMode={isDarkMode} />;
            case 'creat':
               
                return <DashboardCreateOrEditMapView isDarkMode={isDarkMode} />;
            case 'search':
                
                return <DashboardSearchMapView isDarkMode={isDarkMode}/>;
            // 添加其他视图类型的 case
            default:
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
                    <label className="switch">
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
                        className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`}
                        onClick={() => handleSelectedViewChange(<DashboardMapListView handleEditView={handleEditView} isDarkMode={isDarkMode} />,'dashboard')}>Dashboard</button>
                </div>
                <div className="sidebar-buttons">
                    <button
                        className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`}
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
                {/* <div className="darkmodebutton">
                    <div className={`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`}>Dark Mode</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={handleToggle}
                            />
                        <span className="slider"></span>
                    </label>
                </div> */}
            </div>
            <div className={`selectedDashboard ${isDarkMode ? 'selectedDashbord-dark' : 'selectedDashbord'}`} style={{ overflowX: "hidden" }}> {React.cloneElement(auth_store.user?selectedView, { key: refreshCount }):''}</div>
            </div>
           

    )

}