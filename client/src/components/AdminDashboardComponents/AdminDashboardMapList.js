import '../../styles/Dashboard.css';

import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

import arrow from "../../assets_img/dashboard_arrow.svg";
import map from "../../assets_img/dashboard_map.svg";
import glass from "../../assets_img/dashboard_glass.svg";


export default function AdminDashboardMapList(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    const [searchKeyword, setSearchKeyword] = useState('');

    //List of maps. 
    const [allMaps, setAllMaps] = useState([]);
    const [mapSortingOption, setMapSortingOption] = useState('');

    //function to handle get the array of map objects 
    const getALLMaps = () => {
        setAllMaps(auth_store.getAllMaps())
    }
    //function to handle open map select view Screen. 
    const openMapSelect = (map) => {
        auth_store.openMapSelect(map)
    }
    //function to handle delete map process. 
    const deleteMap = (map) => {
        auth_store.deleteMap(map)
    }

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value)
    }

    //Handle changes in map sorting change.
    const handleMapSortingChange = (option) => {
        setMapSortingOption(option)
    }
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        openMapSelect(event)
    }
    //Handles map delete button click. 
    const handleDeleteMap = (event) => {
        deleteMap(event)
    }

    return (
        <div>
        <div className='dashboard-header'>
            Search Map
        </div>
        <div className='search-box'>
            <img className="glass" src={glass} alt="My SVG" />
            <input type="text" value={searchKeyword} onChange={handleSearchChange} style={{backgroundColor: "#DAEDD5", border:"#DAEDD5", borderRadius: "2px", width: "97%", height: "50px", paddingLeft: "50px"}}></input>
            <button className="search-button">Search</button>
        </div>
        <div className='description-and-sorting' style={{justifyContent: "end"}}>
        <div className='sort-buttons'>
            <button className='arrow-button' onClick={() => handleMapSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleMapSortingChange()}>Ascending</button>
            <button className='arrow-button' onClick={() => handleMapSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleMapSortingChange()}>Descending</button>
            <button className='arrow-button' onClick={() => handleMapSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleMapSortingChange()}>Date</button>
        </div>
        </div>
        <div className="box-container">
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>User1Map1</div><button className="delete" onClick={() => handleDeleteMap()}>Delete</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>User1Map2</div><button className="delete" onClick={() => handleDeleteMap()}>Delete</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>User3Map1</div><button className="delete" onClick={() => handleDeleteMap()}>Delete</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>User4Map1</div><button className="delete" onClick={() => handleDeleteMap()}>Delete</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>User4Map2</div><button className="delete" onClick={() => handleDeleteMap()}>Delete</button></div></button>
        </div>
    </div>
    )
}