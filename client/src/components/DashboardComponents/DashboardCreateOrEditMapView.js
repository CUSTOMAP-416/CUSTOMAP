import React, { useContext, useState, useEffect } from "react";
import AuthStoreContextProvider from "../../auth_store";
import { Link } from "react-router-dom";
import MapComponent from "../../map.jsx";
import '../../styles/Dashboard.css';

export default function DashboardCreateOrEditMapView() {
  const { auth_store } = useContext(AuthStoreContextProvider);

  const selectMap = auth_store.selectMap;
  const isCreatePage = auth_store.isCreatePage;

  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  //function to handle the create a new map process
  const onCreateMap = () => {
    auth_store.createMap(mapData, mapTitle);
  };
  //function to handle the edit map process
  const onEditMap = () => {
    auth_store.onEditMap();
  };
  //function to handle the fork map process
  const onForkMap = () => {
    auth_store.onForkMap();
  };
  //function to handle the attach property process
  const onAttachProperty = (state) => {
    auth_store.onAttachProperty(state);
  };
  //function to handle the redo process.
  const onRedo = () => {
    auth_store.onRedo();
  };
  //function to handle the undo process.
  const onUndo = () => {
    auth_store.onUndo();
  };
  //function to handle open customize tool Screen.
  const openCustomizeTool = (map) => {
    auth_store.openCustomizeTool(map);
  };

  //Stores the map data.
  const [mapData, setMapData] = useState(null);
  //Stores the map title input.
  const [mapTitle, setMapTitle] = useState("");
  //Stores the map description input.
  const [mapDescription, setMapDescription] = useState("");
  //Stores the property key input.
  const [propertyKey, setPropertyKey] = useState("");
  //Stores the property value input.
  const [propertyValue, setPropertyValue] = useState("");

  //Handles map title changes.
  const handleMapTitleChange = (event) => {
    setMapTitle(event.target.value);
  };
  //Handles map description changes.
  const handleMapDescriptionChange = (event) => {
    setMapDescription(event.target.value);
  };
  //Handles Property Key changes.
  const handlePropertyKeyChange = (event) => {
    setPropertyKey(event.target.value);
  };
  //Handles Property Value changes.
  const handlePropertyValueChange = (event) => {
    setPropertyValue(event.target.value);
  };
  //Handles file uploads.
  const handleUploadFile = (event) => {
    setMapData(event.target.files[0])
  };
  //Handles attach property button click.
  const handleAttachProperty = () => {
    const state = {
      key: propertyKey,
      value: propertyValue,
    };
    onAttachProperty(state);
  };
  //Handles the map customization button click.
  const handleCustomizeTool = () => {
    openCustomizeTool(selectMap);
  };
  //Handles the fork map button click.
  const handleForkMap = () => {
    onForkMap();
  };
  //Handles the undo button click.
  const handleUndo = () => {
    onUndo();
  };
  //Handles the redo button click.
  const handleRedo = () => {
    onRedo();
  };
  //Handles cancel button click.
  const handleCancel = () => {};
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
    onEditMap();
  };


  return (
    <div className="createEditAll">
      <div>
        <div class="creat-banner">
          <div class="title-section">
            <div className="dashboard-header">Creat Map</div>
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
              onClick={() => handleCustomizeTool()}
            >
              Customize Tool
            </Link>
          </div>

          <div className="button-section">
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
              onClick={() => handleForkMap()}
            >
              Fork Map
            </button>
            <p class="file-types">↑ Available on SHP/DBF, GeoJSON, KML</p>
          </div>
        </div>
        <div className="create-content">
          <div class="property-bar">
            <label for="key">Property</label>
            <input
              type="text"
              id="key"
              placeholder="Property Key"
              value={propertyValue}
              onChange={handlePropertyValueChange}
            />
            <input
              type="text"
              id="value"
              placeholder="Property Value"
              value={propertyValue}
              onChange={handlePropertyValueChange}
            />
            <button class="attach-btn" onClick={() => handleAttachProperty()}>
              Attach
            </button>
            <div class="icons">
              <button class="icon-link" onClick={() => handleUndo()}>
                ↩
              </button>
              <button class="icon-search" onClick={() => handleRedo()}>
                ↪
              </button>
            </div>
          </div>
        </div>

        <MapComponent mapData={mapData} />
        {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
        <div class="create-map-bottom-bar">
          <input
            type="text"
            id="map-name"
            placeholder="Map Name"
            value={mapTitle}
            onChange={handleMapTitleChange}
          />
          <button id="cancel-button" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button id="create-button" onClick={() => handleCreateMap()}>
            Create Map
          </button>
          <button
            id="edit-button"
            type="button"
            onClick={() => handleEditMap()}
          >
            Edit Map
          </button>
        </div>
      </div>
    </div>
  );
}
