import React, { useContext, useState, useEffect } from "react";
import AuthStoreContextProvider from "../../auth_store";
import { Link } from "react-router-dom";
import MapComponent from "../../map.jsx";
import '../../styles/Dashboard.css';

import toGeoJSON from "@mapbox/togeojson"; // Updated import for toGeoJSON
import * as shapefile from "shapefile";
import JSZip from 'jszip';
import { timeout } from "async";

export default function DashboardCreateOrEditMapView() {
  const { auth_store } = useContext(AuthStoreContextProvider);

  const [errorMessage, setErrorMessage] = useState('');

  //function to handle the create a new map process
  const onCreateMap = () => {
    auth_store.createMap(mapData, mapTitle, mapDescription);
    alert("Created successfully!")
    setMapData(null)
    setMapTitle('')
    setMapDescription('')
  };

  //function to handle open customize tool Screen.
  const openCustomizeTool = (map) => {
    auth_store.openCustomizeTool(map);
  };

  const [texts, setTexts] = useState([]);
  const [colors, setColors] = useState([]);
  const [legends, setLegends] = useState([]);
  //Stores the map data.
  const [mapData, setMapData] = useState(null);
  //Stores the map title input.
  const [mapTitle, setMapTitle] = useState("");
  //Stores the map description input.
  const [mapDescription, setMapDescription] = useState("");

  //Handles map title changes.
  const handleMapTitleChange = (event) => {
    setMapTitle(event.target.value);
  };
  //Handles map description changes.
  const handleMapDescriptionChange = (event) => {
    setMapDescription(event.target.value);
  };
  //Handles file uploads.
  const handleUploadFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.name.endsWith(".zip")) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
          const zip = await JSZip.loadAsync(e.target.result);

          const shpFile = zip.file(/\.shp$/i)[0];
          const dbfFile = zip.file(/\.dbf$/i)[0];

          // Read the content of each component as ArrayBuffer
          const shpBuffer = await shpFile.async("arraybuffer");
          const dbfBuffer = await dbfFile.async("arraybuffer");

          const geojson = await shapefile.read(shpBuffer, dbfBuffer);

          setMapData(geojson)
          } catch (error) {
            console.error("Error loading Shapefile:", error);
          }
        };

        // Read the .shp file as an ArrayBuffer
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith(".kml")) {
        // Handle KML using toGeoJSON
        const reader = new FileReader();
        reader.onload = (e) => {
          const kmlString = e.target.result;

          // Convert KML to GeoJSON using toGeoJSON
          const kmlDocument = new DOMParser().parseFromString(
            kmlString,
            "text/xml"
          );
          const geojson = toGeoJSON.kml(kmlDocument);

          // Store the GeoJSON layer in the state
          setMapData(geojson)
        };
        reader.readAsText(file);
      } else if (file.name.endsWith(".geojson")) {
        // Handle GeoJSON directly
        const reader = new FileReader();
        reader.onload = (e) => {
          const geojson = JSON.parse(e.target.result);

          // Store the GeoJSON layer in the state
          setMapData(geojson)
        };
        reader.readAsText(file);
      } else {
        console.error("Unsupported file format");
      }
    }
  };

  //Handles the map customization button click.
  const handleCustomizeTool = () => {
    openCustomizeTool(auth_store.selectMap);
  };
  //Handles the fork map button click.
  const handleForkMap = () => {
    setIsForkOpen(!isForkOpen)
  };
  const [isForkOpen, setIsForkOpen] = useState(false);
  const handleForkContent = (name) => {
    auth_store.onForkMap(name);
  };
  //Handles cancel button click.
  const handleCancel = () => {
    setMapData(null)
    setMapTitle('')
    setMapDescription('')
  };
  //Handles map create button click.
  const handleCreateMap = () => {
    if(mapData == null || mapTitle == ""){
      setErrorMessage('The map or map name is empty, please upload or fork it.')
    }
    else{
      onCreateMap();
      setErrorMessage(
        auth_store.errorMessage
      );
    }
  };
  //Handles map Edit button click.
  const handleEditMap = () => {
    if(mapTitle != auth_store.selectMap.title || mapDescription != auth_store.selectMap.description){
      //function to handle the edit map process
      auth_store.onEditMap(mapTitle, mapDescription);
    }
    alert("Success Changed!")
  };
  //share map
  const shareMap = () => {
    auth_store.shareMap(auth_store.selectMap._id, parseInt(shareEmail, 10))
    setIsShareOpen(!isShareOpen)
  };
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const handleShareEmailChange = (event) => {
    setShareEmail(event.target.value);
  };
  const handleShareMap = () => {
    setIsShareOpen(!isShareOpen)
  }
  //change visbility
  const changeVisibility = () => {
    if(visibility === 'private'){
      setVisibility('public')
      auth_store.selectMap.visibility = 'public'
      auth_store.changeVisibility(auth_store.selectMap._id, 'public')
    }
    else{
      setVisibility('private')
      auth_store.selectMap.visibility = 'private'
      auth_store.changeVisibility(auth_store.selectMap._id, 'private')
    }
  };
  const [visibility, setVisibility] = useState('');

  useEffect(() => {
    if(!auth_store.isCreatePage && auth_store.selectMap != null){
      setTimeout(function() {
        setMapData(auth_store.selectMap.mapData)
        setTexts(auth_store.selectMap.texts)
        setColors(auth_store.selectMap.colors)
        setLegends(auth_store.selectMap.legends)
        setMapTitle(auth_store.selectMap.title)
        setMapDescription(auth_store.selectMap.description)
        setVisibility(auth_store.selectMap.visibility)
      }, 100);
    }
  }, [auth_store.selectMap]);

  useEffect(() => {
      setMapData(auth_store.forkMap)
  }, [auth_store.forkMap]);

  return (
    <div className="createEditAll">
      <div>
        <div className="creat-banner">
          <div className="title-section">
          {isForkOpen && (
              <div className="fork-content">
                <a className="fork" onClick={() => handleForkContent("North America")}>North America</a>
                <a className="fork" onClick={() => handleForkContent("South America")}>South America</a>
                <a className="fork" onClick={() => handleForkContent("Oceania")}>Oceania</a>
                <a className="fork" onClick={() => handleForkContent("Europe")}>Europe</a>
                <a className="fork" onClick={() => handleForkContent("Africa")}>Africa</a>
                <a className="fork" onClick={() => handleForkContent("Asia")}>Asia</a>
                <a className="fork" onClick={() => handleForkContent("World")}>World</a>
              </div>
            )}
            <div className="dashboard-header">{auth_store.isCreatePage ? 'Create Map' : 'Edit Map'}</div>
            {auth_store.isCreatePage ?'':
              <div>
                
              <button
                className="button upload"
                type="button"
                onClick={() =>
                  document.getElementById("link-to-map-view").click()
                }
              >
                Map Customize Tool
              </button>
              <Link
                id="link-to-map-view"
                to="/MapView/"
                onClick={() => handleCustomizeTool()}>
                Map Customize Tool
              </Link>
              <button
               className="button upload"
               type="button"
               id="saveButton"
              >
               Export Map
              </button>
            </div>
            }
          </div>
          <div className="button-section">
            {auth_store.isCreatePage ?
            <div>
              <input
                type="file"
                id="creatmap-fileInput"
                accept=".zip,.kml,.geojson"
                onChange={handleUploadFile}
              />

              <button
                className="button upload"
                type="button"
                onClick={() =>
                  document.getElementById("creatmap-fileInput").click()
                }
              >
                Upload File
              </button>

              <button
                className="button fork"
                type="button"
                onClick={() => handleForkMap()}>
                Fork Map
              </button>
              <p className="file-types">↑ Available on SHP/DBF, GeoJSON, KML</p> 
            </div>: ''}
            {auth_store.isCreatePage ? "":
            <div>
              <button className="button upload" type="button" onClick={() => handleShareMap()}>Share Map</button>
              {isShareOpen && (
                <div className="fork-content">
                  <input type="text" value={shareEmail} onChange={handleShareEmailChange}/>
                  <button onClick={() => shareMap()}>Share</button>
                </div>
              )}
              <button className="button upload" type="button" onClick={() => changeVisibility()}>{visibility}</button>
            </div>}
          </div>
        </div>
        <div className="create-content">
          <div className="property-bar">
            <label className="MD">Map Description</label>
            <input
              type="text"
              data-cy="create_discrip"
              placeholder="Description"
              value={mapDescription}
              onChange={handleMapDescriptionChange }
            />
          </div>
        </div>
        <MapComponent 
          mapData={mapData}
          texts={texts}
          colors={colors}
          legends={legends} 
        />
        {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
        <div className="create-map-bottom-bar">
          <input
            type="text"
            data-cy="create_mapname"
            id="map-name"
            placeholder="Map Name"
            value={mapTitle}
            onChange={handleMapTitleChange}
          />
          <button id="cancel-button" onClick={() => handleCancel()}>
            Cancel
          </button>
          {auth_store.isCreatePage 
            ? <button id="create-button" onClick={() => handleCreateMap()}>
              Create Map
              </button>
            : <button id="edit-button" onClick={() => handleEditMap()}>
              Edit Map
              </button>}
        </div>
      </div>
    </div>
  );
}
