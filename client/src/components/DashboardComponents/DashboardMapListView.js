import '../../styles/Dashboard.css';
import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

import arrow from "../../assets_img/dashboard_arrow.svg";
import map from "../../assets_img/dashboard_map.svg";

export default function DashboardMapListView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //List of user maps. 
    const [userMaps, setUserMaps] = useState([]);
    //Stores the currently selected map. 
    const [mapSelected, setMapSelected] = useState(null);
    //Stores the map sorting option. 
    const [sortingOption, setSortingOption] = useState('');

    const user = auth_store.user

    //function to handle getting the list of user's created maps. 
    const getUserMaps = (user) => {
        setUserMaps(auth_store.getUserMaps(user))
    }
    //function to handle delete map process. 
    const deleteMap = (map) => {
        auth_store.deleteMap(map)
    }
    //function to handle open edit map Screen. 
    const openEdit = (map) => {
        auth_store.openEdit(map)
    }
    //function to handle open map select view Screen. 
    const openMapSelect = () => {
        auth_store.openMapSelect(mapSelected)
    }

    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        setMapSelected(event)
        openMapSelect()
    }
    //Handle changes in map sorting.
    const handleSortingChange = (event) => {
        setSortingOption(event)
    }
    //Handles map delete button click. 
    const handleDeleteMap = (event) => {
        deleteMap(event)
    }
    //Handles map edit button click. 
    const handleEdit = (event) => {
        openEdit(event)
    }
    
    return (
        // <div>
        //     <button type="button" onClick={() => handleSortingChange()}>sorting</button>
        //     <button type="button" onClick={() => handleMapSelect()}>Map Name</button>
        //     <button type="button" onClick={() => handleEdit()}>Edit</button>
        //     <button type="button" onClick={() => handleDeleteMap()}>X</button>
        // </div>
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
                    <div className='boxes'><button className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap1</div><button className="delete">Delete</button></div></button></div>
                    <div className='boxes'><button className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap2</div><button className="delete">Delete</button></div></button></div>
                    <div className='boxes'><button className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap3</div><button className="delete">Delete</button></div></button></div>
                    <div className='boxes'><button className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap4</div><button className="delete">Delete</button></div></button></div>
                    <div className='boxes'><button className="box"><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap5</div><button className="delete">Delete</button></div></button></div>
                </div>
            </div>
            )

}