import '../../styles/Dashboard.css';

import { useContext, useState, useEffect } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import { Link } from "react-router-dom";

import arrow from "../../assets_img/dashboard_arrow.svg";
import map from "../../assets_img/dashboard_map.svg";
import glass from "../../assets_img/dashboard_glass.svg";


export default function AdminDashboardMapList(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    const [searchKeyword, setSearchKeyword] = useState('');
    //List of maps. 
    const [showMapsContent, setShowMapsContent] = useState([]);
    const [showMaps, setShowMaps] = useState([]);
    const [allMaps, setAllMaps] = useState([]);

    //function to handle get the array of map objects 
    useEffect(() => {
        setAllMaps(auth_store.maps)
        setShowMaps(auth_store.maps)
    }, [auth_store.maps]);

    useEffect(() => {
        const maps = []
        for(let i=0; i<showMaps.length; i++){
            maps.push(
                <div key={showMaps[i]._id} className="box">
                    <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
                        <div className='map-name'>{showMaps[i].title}</div>
                        <button className="delete" onClick={() => handleDeleteMap(showMaps[i]._id)}>X</button>
                    </div>
                    <Link to="/MapView/" onClick={() => handleMapSelect(showMaps[i]._id)}>
                        <img className="map" src={map} alt="My SVG" />
                    </Link>
                </div>
            )
        }
        setShowMapsContent(maps)
    }, [showMaps]);
 
    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value)
    }
    //Handle the search button click. 
    const handleSearch = () => {
        //function to handle the search process 
        const lowerCaseLetter = searchKeyword.toLowerCase();
        setShowMaps(allMaps.filter(str => str.title.toLowerCase().includes(lowerCaseLetter)));
    }

    //Handle changes in map sorting change.
    const handleSortingChange = (event) => {
        const mapsId = [...showMaps]
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
                <div key={mapsId[i]._id} className="box">
                    <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
                        <div className='map-name'>{mapsId[i].title}</div>
                        <button className="delete" onClick={() => handleDeleteMap(mapsId[i]._id)}>X</button>
                    </div>
                    <Link to="/MapView/" onClick={() => handleMapSelect(mapsId[i]._id)}>
                        <img className="map" src={map} alt="My SVG" />
                    </Link>
                </div>
            )
        }
        setShowMapsContent(maps)
    }
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        console.log(event)
        auth_store.getMap(event)
    }
    //Handles map delete button click. 
    const handleDeleteMap = (event) => {
        //function to handle delete map process. 
        auth_store.deleteMap(event)
        let maps = allMaps
        let index = maps.findIndex(str => str._id == event);
        maps.splice(index, 1);
        setAllMaps(maps)
        maps = showMaps
        index = maps.findIndex(str => str._id == event);
        maps.splice(index, 1);
        setShowMaps(maps)
        handleSortingChange("Recent Date")
    }

    return (
        <div>
        <div className='dashboard-header'>
            Search Map
        </div>
        <div className='search-box'>
            <img className="glass" src={glass} alt="My SVG" />
            <input type="text" value={searchKeyword} onChange={handleSearchChange} style={{backgroundColor: "#DAEDD5", border:"#DAEDD5", borderRadius: "2px", width: "97%", height: "50px", paddingLeft: "50px"}}></input>
            <button className="search-button" onClick={() => handleSearch()}>Search</button>
        </div>
        <div className='description-and-sorting' style={{justifyContent: "end"}}>
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
            {showMapsContent}
        </div>
    </div>
    )
}