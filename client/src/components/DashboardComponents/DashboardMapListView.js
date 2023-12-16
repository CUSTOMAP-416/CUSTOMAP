import '../../styles/Dashboard.css';
import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AuthStoreContextProvider from '../../auth_store';

import mapImage from "../../assets_img/mapImage.png";
import map from "../../assets_img/Default.png";
import heat from "../../assets_img/Heat.png";
import point from "../../assets_img/Point.png";
import bubble from "../../assets_img/Bubble.png";
import thematic from "../../assets_img/Thematic.png";
import choropleth from "../../assets_img/Choropleth.png";

export default function DashboardMapListView( props ){
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
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        console.log(event)
        auth_store.getMap(event)
        auth_store.isCreatePage = true;
        
    }
    //Handle changes in map sorting.
    const handleSortingChange = (event) => {
        const mapsId = [...auth_store.user.maps]
        if(event === "Ascending"){
            mapsId.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if(event === "Descending"){
            mapsId.sort((a, b) => b.title.localeCompare(a.title));
        }
        else if(event === "Recent Date"){
            mapsId.sort((a, b) => a.createdDate - b.createdDate);
        }
//{`sidebar-buttons ${isDarkMode ? 'sidebar-buttons-dark' : 'sidebar-buttons'}`}
        const maps = []
        for(let i=0; i<mapsId.length; i++){
            maps.push(
                <div key={mapsId[i]._id} className={`box ${props.isDarkMode ? 'box' : 'box-dark'}`}>
                    <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
                        <div className={props.isDarkMode ? 'map-name' : 'map-name-dark'}>{mapsId[i].title}</div>
                        <button className="delete" onClick={() => handleEdit(mapsId[i]._id)}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteMap(mapsId[i]._id)}>X</button>
                    </div>
                    <Link to="/MapView/" onClick={() => handleMapSelect(mapsId[i]._id)}>
                    {mapsId[i].mapType === "heat" ? <img className="map" src={heat} alt="My SVG" /> : 
                        mapsId[i].mapType === "point" ? <img className="map" src={point} alt="My SVG" /> :
                        mapsId[i].mapType === "bubble" ? <img className="map" src={bubble} alt="My SVG" /> :
                        mapsId[i].mapType === "thematic" ? <img className="map" src={thematic} alt="My SVG" /> :
                        mapsId[i].mapType === "choropleth" ? <img className="map" src={choropleth} alt="My SVG" /> :
                        <img className="map" src={map} alt="My SVG" />}
                    </Link>
                </div>
            )
        }
        setUserMaps(maps)
    }
    //Handles map delete button click. 
    const handleDeleteMap = (event) => {
        auth_store.deleteMap(event)
        handleSortingChange("Recent Date")
    }
    //Handles map edit button click. 
    const handleEdit = (id) => {
        //function to handle open edit map Screen. 
        handleMapSelect(id)
        auth_store.openEdit(false)
        props.handleEditView()
        props.handleEditView(id, props.isDarkMode);
    }
    
    useEffect(() => {
        const maps = [];
        if(auth_store.user && auth_store.user.maps.length > 0){
            for(let i=0; i<auth_store.user.maps.length; i++){
                maps.push(
                    <div key={auth_store.user.maps[i]._id} className={props.isDarkMode ? 'box' : 'box-dark'}>
                        <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
                            <div className={props.isDarkMode ? 'map-name' : 'map-name-dark'}>{auth_store.user.maps[i].title}</div>
                            <button className="delete" onClick={() => handleEdit(auth_store.user.maps[i]._id, props.isDarkMode)}>Edit</button>
                            <button className="delete" onClick={() => handleDeleteMap(auth_store.user.maps[i]._id)}>X</button>
                        </div>
                        <Link to="/MapView/" onClick={() => handleMapSelect(auth_store.user.maps[i]._id )}>
                            {auth_store.user.maps[i].mapType === "heat" ? <img className="map" src={heat} alt="My SVG" /> : 
                            auth_store.user.maps[i].mapType === "point" ? <img className="map" src={point} alt="My SVG" /> :
                            auth_store.user.maps[i].mapType === "bubble" ? <img className="map" src={bubble} alt="My SVG" /> :
                            auth_store.user.maps[i].mapType === "thematic" ? <img className="map" src={thematic} alt="My SVG" /> :
                            auth_store.user.maps[i].mapType === "choropleth" ? <img className="map" src={choropleth} alt="My SVG" /> :
                            <img className="map" src={map} alt="My SVG" />}
                        </Link>
                    </div>
                )
            }
            setUserMaps(maps)
        }
        else{
            setUserMaps(emptyMap);
        }
    },[]);
    
    
    const emptyMap = (
        <div className="emptyMap">
          <img className="mapImage" src={mapImage} alt="mapImage" />
          <div className="emptyText">
            <div>Click the "Create Map" button</div>
            <div>to create your own new map!</div>
          </div>
        </div>
    );

    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true; 
    return (
        console.log(props.isDarkMode),
        <div style={{height: 'auto',overflow: 'auto'}}>
        <div className={`dashboard-header ${ isDarkMode ? 'dashboard-header' : 'dashboard-header-dark'}`}>Dashboard</div>
        <div className="description-and-sorting">
          <div className="description">Maps you have participated in</div>
          <div className="sort-buttons">
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
        <div className="box-container">{userMaps}</div>
      </div>
    );
}
