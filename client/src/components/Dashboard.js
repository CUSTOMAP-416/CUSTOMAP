import '../styles/Dashboard.css';

import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

import DashboardMapListView from './DashboardComponents/DashboardMapListView';
import DashboardMyProfileView from './DashboardComponents/DashboardMyProfileView';
import DashboardCreateOrEditMapView from './DashboardComponents/DashboardCreateOrEditMapView';
import DashboardSearchMapView from './DashboardComponents/DashboardSearchMapView';

import bear from "../assets_img/dashboard_bear.svg";
import arrow from "../assets_img/dashboard_arrow.svg";
import map from "../assets_img/dashboard_map.svg";


export default function Dashboard(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle open the selected view screen 
    const openViewScreen = () => {
        auth_store.openViewScreen()
    }

    //Stores the currently selected view (Dash Board, My Profile, Create Map, Search Map)
    const [selectedView, setSelectedView] = useState(<DashboardMapListView/>);

    //Handles changing the selected view.
    const handleSelectedViewChange = (event) => {
        setSelectedView(event)
    }

    return (
        <div className='container'>
            <div className='sidebar'>
            <img className="bear" src={bear} style={{padding:"30px 0px"}}alt="My SVG" />
                <div className='profile'>Hello User</div>
                <div className="sidebar-buttons">
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardMapListView />)}>Dashboard</button>
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
            <div style={{width: "100%"}}>
                <div className='dashboard-header'>
                    Dashboard
                </div>
                <div className='description-and-sorting'>
                    <div className='description'>Maps you have participated in</div>
                <div className='sort-buttons'>
                    <button className='arrow-button'><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button">Ascending</button>
                    <button className='arrow-button'><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button">Descending</button>
                    <button className='arrow-button'><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button">Date</button>
                </div>
                </div>
                <div className="box-container">
                    <div className='boxes'><div className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap1</div><button className="delete">Delete</button></div></div></div>
                    <div className='boxes'><div className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap2</div><button className="delete">Delete</button></div></div></div>
                    <div className='boxes'><div className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap3</div><button className="delete">Delete</button></div></div></div>
                    <div className='boxes'><div className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap4</div><button className="delete">Delete</button></div></div></div>
                    <div className='boxes'><div className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap5</div><button className="delete">Delete</button></div></div></div>
                </div>
                    {/* {selectedView} */}
            </div>
        </div>

    )

}