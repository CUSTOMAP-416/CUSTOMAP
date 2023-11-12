import { useContext, useState } from 'react';
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

    //function to handle the search process 
    const onSearch = () => {
        setSearchMaps(auth_store.onSearch(searchKeyword))
    }
    //function to handle open map select view Screen. 
    const openMapSelect = () => {
        auth_store.openMapSelect(mapSelected)
    }

    //Handle Search input changes.
    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value)
    }
    //Handle the search button click. 
    const handleSearch = () => {
        onSearch()
    }
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        setMapSelected(event)
        openMapSelect()
    }
    //Handle changes in map sorting change. 
    const handleSortingChange = (event) => {
        setSortingOption(event)
    }

    return(
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
            <button className='arrow-button' onClick={() => handleSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleSortingChange()}>Ascending</button>
            <button className='arrow-button' onClick={() => handleSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleSortingChange()}>Descending</button>
            <button className='arrow-button' onClick={() => handleSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleSortingChange()}>Date</button>
        </div>
        </div>
        <div className="box-container">
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap1</div><button className="delete" onClick={() => handleSearch()}>Edit</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap1</div><button className="delete" onClick={() => handleSearch()}>Edit</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap1</div><button className="delete" onClick={() => handleSearch()}>Edit</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap1</div><button className="delete" onClick={() => handleSearch()}>Edit</button></div></button>
        <button className="box" onClick={() => handleMapSelect()}><img className="map" src={map} alt="My SVG" /><div style={{display: "flex", justifyContent: "center"}}><div className='map-name'>MyMap1</div><button className="delete" onClick={() => handleSearch()}>Edit</button></div></button>
        </div>
    </div>
    )
}