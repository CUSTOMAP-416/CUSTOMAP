import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AuthStoreContextProvider from '../../auth_store';

import arrow from "../../assets_img/dashboard_arrow.svg";
import map from "../../assets_img/dashboard_map.svg";
import glass from "../../assets_img/dashboard_glass.svg";

export default function DashboardSearchMapView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    const [searchKeyword, setSearchKeyword] = useState('');
    //List of search maps. 
    const [searchMaps, setSearchMaps] = useState([]);
    //Stores the currently selected map. 
    const [mapSelected, setMapSelected] = useState(null);
    //Stores the map sorting option. 
    const [sortingOption, setSortingOption] = useState('');
    const [rander, setRander] = useState(true);

    //Handle Search input changes.
    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value)
    }
    //Handle the search button click. 
    const handleSearch = () => {
        //function to handle the search process 
        auth_store.onSearch(searchKeyword)
        setRander(!rander)
    }
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        console.log(event)
        auth_store.getMap(event)
    }
    //Handle changes in map sorting change. 
    const handleSortingChange = (event) => {
        const mapsId = [...auth_store.searchMaps]
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
                    </div>
                    <Link to="/MapView/" onClick={() => handleMapSelect(mapsId[i]._id)}>
                        <img className="map" src={map} alt="My SVG" />
                    </Link>
                </div>
            )
        }
        setSearchMaps(maps)
    }
    useEffect(() => {
        if(auth_store.searchMaps != null){
            const maps = []
            for(let i=0; i<auth_store.searchMaps.length; i++){
                maps.push(
                    <div key={auth_store.searchMaps[i]._id} className="box">
                        <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
                            <div className='map-name'>{auth_store.searchMaps[i].title}</div>
                        </div>
                        <Link to="/MapView/" onClick={() => handleMapSelect(auth_store.searchMaps[i]._id)}>
                            <img className="map" src={map} alt="My SVG" />
                        </Link>
                    </div>
                )
            }
            setSearchMaps(maps)
        }
    }, [auth_store.searchMaps])

    return(
        <div>
        <div className='dashboard-header'>
            Search Map
        </div>
        <div className='search-box'>
            <img className="glass" src={glass} alt="My SVG" />
            <input className ='search-input' type="text" value={searchKeyword} onChange={handleSearchChange} style={{backgroundColor: "#DAEDD5", border:"#DAEDD5", borderRadius: "2px", width: "97%", height: "50px", paddingLeft: "50px"}}></input>
            <button className="search-button" onClick={() => handleSearch()}>Search</button>
        </div>
        <div className='description-and-sorting' style={{justifyContent: "end"}}>
        <div className='sort-buttons'>
            {/* <button className='arrow-button'  onClick={() => handleSortingChange("Ascending")}>
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
            <button className="sort-button" onClick={() => handleSortingChange("Recent Date")}>Recent Date</button> */}
            <div className="sort-dropdown">
              <select onChange={(e) => handleSortingChange(e.target.value)}>
                <option value="defult">SORT</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
                <option value="Recent Date">Recent Date</option>
              </select>
            </div>
        </div>
        </div>
        <div className="box-container">
            {searchMaps}
        </div>
    </div>
    )
}