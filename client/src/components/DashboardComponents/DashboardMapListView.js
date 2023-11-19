import '../../styles/Dashboard.css';
import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        auth_store.getMap(event)
    }
    //Handle changes in map sorting.
    const handleSortingChange = (event) => {
        const mapsId = [...auth_store.user.maps]
        if(event == "Ascending"){
            mapsId.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if(event == "Descending"){
            mapsId.sort((a, b) => b.title.localeCompare(a.title));
        }
        else if(event == "Recent Date"){
            mapsId.sort((a, b) => a.createdDate - b.createdDate);
        }

        const maps = []
        for(let i=0; i<mapsId.length; i++){
            maps.push(
                <Link  key={auth_store.user.maps[i]._id} className="box" to="/MapView/" onClick={() => handleMapSelect(mapsId[i]._id)}>
                    <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
                        <div className='map-name'>{mapsId[i].title}</div>
                        <button className="delete" onClick={() => handleEdit()}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteMap()}>X</button>
                    </div>
                    <img className="map" src={map} alt="My SVG" />
                </Link>
            )
        }
        setUserMaps(maps)
    }
    //Handles map delete button click. 
    const handleDeleteMap = (event) => {
        deleteMap(event)
    }
    //Handles map edit button click. 
    const handleEdit = (event) => {
        openEdit(event)
    }
    
    useEffect(() => {
        const maps = []
        for(let i=0; i<auth_store.user.maps.length; i++){
            maps.push(
                <Link key={auth_store.user.maps[i]._id} className="box" to="/MapView/" onClick={() => handleMapSelect(auth_store.user.maps[i]._id)}>
                    <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
                        <div className='map-name'>{auth_store.user.maps[i].title}</div>
                        <button className="delete" onClick={() => handleEdit()}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteMap()}>X</button>
                    </div>
                    <img className="map" src={map} alt="My SVG" />
                </Link>
            )
        }
        setUserMaps(maps)
    }, []);

    return (
        <div>
            <div className='dashboard-header'>
                Dashboard
            </div>
            <div className='description-and-sorting'>
                <div className='description'>Maps you have participated in</div>
            <div className='sort-buttons'>
                <button className='arrow-button'  onClick={() => handleSortingChange("Ascending")}>
                    <img className="arrow" src={arrow} alt="My SVG" />
                </button>
                <button className="sort-button" onClick={() => handleSortingChange("Ascending")}>Ascending</button>
                <button className='arrow-button' onClick={() => handleSortingChange("Descending")}>
                    <img className="arrow" src={arrow} alt="My SVG" />
                </button>
                <button className="sort-button" onClick={() => handleSortingChange("Descending")}>Descending</button>
                <button className='arrow-button' onClick={() => handleSortingChange("Recent Date")}>
                    <img className="arrow" src={arrow} alt="My SVG" />
                </button>
                <button className="sort-button" onClick={() => handleSortingChange("Recent Date")}>Recent Date</button>
            </div>
            </div>
            <div className="box-container">
                {userMaps}
            </div>
        </div>
            )
}