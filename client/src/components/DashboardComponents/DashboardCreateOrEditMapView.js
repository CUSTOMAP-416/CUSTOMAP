import React, { useContext, useState, useEffect } from "react";
import AuthStoreContextProvider from "../../auth_store";
import { Link } from "react-router-dom";
import MapComponent from "../../map.jsx";
import '../../styles/Dashboard.css';

import toGeoJSON from "@mapbox/togeojson"; // Updated import for toGeoJSON
import * as shapefile from "shapefile";
import JSZip from 'jszip';

export default function DashboardCreateOrEditMapView(props) {
  const { auth_store } = useContext(AuthStoreContextProvider);

  const [errorMessage, setErrorMessage] = useState('');

  //function to handle the create a new map process
  const onCreateMap = () => {
    auth_store.createMap(mapData, mapTitle, mapDescription, selectedMapType);
    alert("Created successfully!")
    setMapData(null)
    setMapTitle('')
    setMapDescription('')
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
    if(mapData === null || mapTitle === ""){
      setErrorMessage('The map or map name is empty, please upload or fork it.')
    }
    else{
      onCreateMap();
    }
  };
  //Handles map Edit button click.
  const handleEditMap = () => {
    if(mapTitle !== auth_store.selectMap.title || mapDescription !== auth_store.selectMap.description){
      //function to handle the edit map process
      auth_store.onEditMap(mapTitle, mapDescription);
    }
    alert("Success Changed!")
  };
  //share map
  const shareMap = () => {
    auth_store.shareMap(auth_store.selectMap._id, shareEmail)
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

  //map type
  const [selectedMapType, setSelectedMapType] = useState('default');

  const handleMapTypeChange = (event) => {
    setSelectedMapType(event.target.value);
  };
  const [layerItems, setLayerItems] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#ffffff"); 
  const [changedFont, setChangedFont] = useState('');

  useEffect(() => {
    if(!auth_store.isCreatePage && auth_store.selectMap != null){
      setTimeout(function() {
        setMapData(auth_store.selectMap.mapData)
        setTexts(auth_store.selectMap.texts)
        setColors(auth_store.selectMap.colors)
        if(auth_store.selectMap.mapType === 'thematic'){
          setLegends(auth_store.selectMap.thematicLegends)
        }
        else{
          setLegends(auth_store.selectMap.legends)
        }
        setMapTitle(auth_store.selectMap.title)
        setMapDescription(auth_store.selectMap.description)
        setVisibility(auth_store.selectMap.visibility)
        setSelectedMapType(auth_store.selectMap.mapType)
        setLayerItems(auth_store.selectMap.customs)
        setChangedFont(auth_store.selectMap.font)
        setSelectedColor(auth_store.selectMap.backgroundColor)
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_store.selectMap]);

  useEffect(() => {
      setMapData(auth_store.forkMap)
  },[auth_store.forkMap]);

  const showExportPage = () => {
    const user = document.getElementById('export-modal');
    user.style.display = 'block';
  }

  const hideExportPage = () => {
    const user = document.getElementById('export-modal');
    user.style.display = 'none';
  }

  return (
    <div className="createEditAll">
      <div>
        <div className="creat-banner" style={{ paddingBottom: "0px" }}>
          <div className="title-section">
            <div className={auth_store.isCreatePage ? (!props.isDarkMode ? 'dashboard-header-dark' : 'dashboard-header') :'dashboard-header'} style={{ padding: "40px 30px" }}>
              {auth_store.isCreatePage ? "Create Map" : "Edit Map"}
            </div>
            {auth_store.isCreatePage ? (
              ""
            ) : (
              <div style={{ paddingBottom: "10px" }}>
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
                >
                  Map Customize Tool
                </Link>
                <button
                  className="button upload"
                  id="export-map"
                  onClick={() => showExportPage()}
                >
                  Export Map
                </button>
                <div id="export-modal">
                  <button className="button upload" id="pdf-option" value="pdf">
                    .PDF
                  </button>
                  <button className="button upload" id="png-option" value="png">
                    .PNG
                  </button>
                  <button
                    className="button upload"
                    id="json-option"
                    value="json"
                  >
                    .JSON
                  </button>
                  <button className="button upload" id="close" onClick={() => hideExportPage()}>
                    x
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="button-section">
            {auth_store.isCreatePage ? (
              <div>
                <select
                  className="button fork fork-select"
                  onChange={handleMapTypeChange}
                >
                  <option value="default">Select Map Type</option>
                  <option value="default">Default Map</option>
                  <option value="heat">Heat Map</option>
                  <option value="point">Point Map</option>
                  <option value="bubble">Bubble Map</option>
                  <option value="thematic">Thematic Map</option>
                  <option value="choropleth">Choropleth Map</option>
                </select>
                <span className="maptype">||</span>
                <input
                  type="file"
                  id="creatmap-fileInput"
                  accept=".zip,.kml,.geojson"
                  onChange={handleUploadFile}
                />

                <select
                  className="button fork fork-select"
                  onChange={(e) => handleForkContent(e.target.value)}
                >
                  <option value="default">Fork Map</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="World">World</option>
                </select>
                <span style={{color: "rgb(168, 168, 168)"}}>or</span>
                <button
                  className="button upload"
                  type="button"
                  onClick={() =>
                    document.getElementById("creatmap-fileInput").click()
                  }
                >
                  Upload File
                </button>
                <p className="file-types">
                  {" "}
                  Available on SHP/DBF, GeoJSON, KML{" "}
                </p>
              </div>
            ) : (
              ""
            )}
            {auth_store.isCreatePage ? (
              ""
            ) : (
              <div>
                <button
                  className="button upload"
                  type="button"
                  onClick={() => handleShareMap()}
                >
                  Share Map
                </button>
                {isShareOpen && (
                  <div className="fork-content">
                    <input
                      type="text"
                      value={shareEmail}
                      onChange={handleShareEmailChange}
                      placeholder="Enter recipient's email"
                    />
                    <button className="shareB" onClick={() => shareMap()}>
                      Share
                    </button>
                  </div>
                )}
                <button
                  className="button upload"
                  type="button"
                  onClick={() => changeVisibility()}
                >
                  {visibility}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="create-content">
          {auth_store.isCreatePage ? (
            <div className={props.isDarkMode ? 'create_detail' : 'create_detail-dark'}>
              ⛧ Choose the Map Type, Use provided map with Fork Map Or upload
              your file!
            </div>
          ) : (
            ""
          )}
          <div className={props.isDarkMode ? 'property-bar' : 'property-bar-dark'}>
            <label
              className="MD"
              style={{ padding: "0px 10px", fontWeight: "bolder" }}
            >
              Map Name:
            </label>
            <input
              type="text"
              data-cy="create_mapname"
              id="map-name"
              placeholder="Map Name"
              value={mapTitle}
              onChange={handleMapTitleChange}
            />
          </div>
        </div>
        <MapComponent
          mapType={selectedMapType}
          mapData={mapData}
          texts={texts}
          colors={colors}
          legendItems={legends}
          layerItems={layerItems}
          changedFont={changedFont}
          selectedColor={selectedColor}
        />
        {errorMessage && (
          <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <div className={props.isDarkMode ? 'create-map-bottom-bar' : 'create-map-bottom-bar-dark'}>
          <div
            className="MD-container"
            style={{ width: "70%", paddingLeft: "20px" }}
          >
            <label className="MD">Map Description:</label>
            <input
              type="text"
              data-cy="create_discrip"
              placeholder="Description"
              value={mapDescription}
              onChange={handleMapDescriptionChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingRight: "20px",
            }}
          >
            <button id="cancel-button" onClick={() => handleCancel()}>
              Cancel
            </button>
            {auth_store.isCreatePage ? (
              <button id="create-button" onClick={() => handleCreateMap()}>
                Create Map
              </button>
            ) : (
              <button id="edit-button" onClick={() => handleEditMap()}>
                Edit Map
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
