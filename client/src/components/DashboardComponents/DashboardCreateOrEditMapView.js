import React, { useContext, useState, useEffect } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import { Link } from "react-router-dom";
import MapComponent from '../../map.jsx';
export default function DashboardCreateOrEditMapView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    const selectMap = auth_store.selectMap
    const isCreatePage = auth_store.isCreatePage

    const [history, setHistory] = useState([]);

    //function to handle the create a new map process 
    const onCreateMap = () => {
        auth_store.onCreateMap()
    }
    //function to handle the edit map process 
    const onEditMap = () => {
        auth_store.onEditMap()
    }
    //function to handle the fork map process 
    const onForkMap = () => {
        auth_store.onForkMap()
    }
    //function to handle the attach property process 
    const onAttachProperty = (state) => {
        auth_store.onAttachProperty(state)
    }
    //function to handle the redo process. 
    const onRedo = () => {
        auth_store.onRedo()
    }
    //function to handle the undo process. 
    const onUndo = () => {
        auth_store.onUndo()
    }
    //function to handle open customize tool Screen. 
    const openCustomizeTool = (map) => {
        auth_store.openCustomizeTool(map)
    }

    //Stores the map data. 
    const [mapData, setMapData] = useState(null);
    //Stores the map title input. 
    const [mapTitle, setMapTitle] = useState('');
    //Stores the map description input. 
    const [mapDescription, setMapDescription] = useState('');
    //Stores the property key input. 
    const [propertyKey, setPropertyKey] = useState('');
    //Stores the property value input. 
    const [propertyValue, setPropertyValue] = useState('');

    //Handles map title changes.
    const handleMapTitleChange = (event) => {
        setMapTitle(event.target.value)
    }
    //Handles map description changes.
    const handleMapDescriptionChange = (event) => {
        setMapDescription(event.target.value)
    }
    //Handles Property Key changes.
    const handlePropertyKeyChange = (event) => {
        setPropertyKey(event.target.value)
    }
    //Handles Property Value changes.
    const handlePropertyValueChange = (event) => {
        setPropertyValue(event.target.value)
    }
    //Handles file uploads.
    const handleUploadFile = (event) => {
    }
    //Handles attach property button click. 
    const handleAttachProperty = () => {
        const state = {
            key: propertyKey,
            value: propertyValue,
        }
        onAttachProperty(state)
    }
    //Handles the map customization button click. 
    const handleCustomizeTool = () => {
        openCustomizeTool(selectMap)
    }
    //Handles the fork map button click. 
    const handleForkMap = () => {
        onForkMap()
    }
    //Handles the undo button click. 
    const handleUndo = () => {
        onUndo()
    }
    //Handles the redo button click. 
    const handleRedo = () => {
        onRedo()
    }
    //Handles cancel button click. 
    const handleCancel = () => {
    }
    //Handles map create button click. 
    const handleCreateMap = () => {
        onCreateMap()
    }
    //Handles map Edit button click. 
    const handleEditMap = () => {
        onEditMap()
    }

    return (
        <div>
        <div>
            <h2>Map Name</h2>
            <input type="text" value={mapTitle} onChange={handleMapTitleChange}></input>
            <h2>Map Description</h2>
            <input type="text" value={mapDescription} onChange={handleMapDescriptionChange}></input>
            <h2>Property Key</h2>
            <input type="text" value={propertyKey} onChange={handlePropertyKeyChange}></input>
            <h2>Property Value</h2>
            <input type="text" value={propertyValue} onChange={handlePropertyValueChange}></input>
            <button type="button" onClick={() => handleUploadFile()}>Upload File</button>
            <button type="button" onClick={() => handleAttachProperty()}>Attach</button>
            <button type="button" onClick={() => handleCustomizeTool()}>Customize Tool</button>
            <Link to='/MapView/' onClick={() => handleCustomizeTool()}>Customize Tool</Link>
            <button type="button" onClick={() => handleForkMap()}>Fork Map</button>
            <button type="button" onClick={() => handleUndo()}>Undo</button>
            <button type="button" onClick={() => handleRedo()}>Redo</button>
            <button type="button" onClick={() => handleCancel()}>Cancel</button>
            <button type="button" onClick={() => handleCreateMap()}>Create New Map</button>
            <button type="button" onClick={() => handleEditMap()}>Edit Map</button>
        </div>
        <MapComponent
        handleUploadFile = {() => handleUploadFile()}/>
      </div>
    )
}