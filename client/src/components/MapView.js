import { useContext, useState, useEffect } from 'react';
import AuthStoreContextProvider from '../auth_store';
import '../styles/MapView.css';
import MapComponent from "../map.jsx";

import MapViewDiscussionForum from './MapViewComponents/MapViewDiscussionForum';
import MapViewCustomizeToolbar from './MapViewComponents/MapViewCustomizeToolbar';

export default function MapView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //Stores the map data.
    const [mapData, setMapData] = useState(null);

    //function to handle open discussion forum. 
    const openDiscussionForum = () => {
        auth_store.openDiscussionForum()
    }

    const [showDiscussionForum, setShowDiscussionForum] = useState(false);
    const [changedText, setChangedText] = useState('');
    const [changedFont, setChangedFont] = useState('');
    const [selectedColor, setSelectedColor] = useState("#ffffff"); 


    const handleFontChange = (font) => {
      console.log(font)
      setChangedFont(font);
    };

    const handleTextChange = (text) => {
      setChangedText(text);
    };


    const handleColorChange = (color) => {
      setSelectedColor(color);
    };

    //Handle the discussion forum button click. 
    const handleDiscussionForum = () => {
        if(showDiscussionForum){
            setShowDiscussionForum(false)
        }
        else{
            setShowDiscussionForum(true)
        }
    }

    const [customization, setCustomization] = useState(null);
    const [customizations, setCustomizations] = useState([]);
    const [undoCustomizations, setUndoCustomizations] = useState([]);
    let custom = null;
    let customs = [];
    let undoCustoms = [];
    const handleCustomization = (state) => {
      customs = customizations
      customs.push(state)
      setCustomizations(customs)
      setUndoCustomizations([])
    };
    //Handles the undo button click.
    const handleUndo = () => {
      if(customizations.length != 0){
        customs = customizations
        undoCustoms = undoCustomizations
        custom = customs.pop()
        undoCustoms.push(custom)
        setCustomizations(customs)
        setUndoCustomizations(undoCustoms)
        setCustomization({
          redoUndo: 'undo',
          custom: custom,
        })
      }
    };
    //Handles the redo button click.
    const handleRedo = () => {
      if(undoCustomizations.length != 0){
        customs = customizations
        undoCustoms = undoCustomizations
        custom = undoCustoms.pop()
        customs.push(custom)
        setCustomizations(customs)
        setUndoCustomizations(undoCustoms)
        setCustomization({
          redoUndo: 'redo',
          custom: custom,
        })
      }
    };

    const [texts, setTexts] = useState([]);
    const [colors, setColors] = useState([]);
    const [isLegendsOpen, setIsLegendsOpen] = useState(false);
    //Handle show legend list.
    const handleShowLegends = () => {
        setIsLegendsOpen(!isLegendsOpen)
    };
    const [legendItems, setLegendItems] = useState([]);
    const [newLegend, setNewLegend] = useState({ color: '#000000', label: '' });
    const handleNewLegendColorChang = (event) => {
      setNewLegend({ ...newLegend, color: event.target.value });
    };
    const handleNewLegendLabelChange = (event) => {
      setNewLegend({ ...newLegend, label: event.target.value });
    };
    const handleAddLegend = () => {
      if (newLegend.label.trim() !== '') {
        setLegendItems([...legendItems, { ...newLegend }]);
        setNewLegend({ _id: null, color: '#000000', label: '' });
      }
    };
    const handleDeleteLegend = (index, _id) => {
      const updatedLegendItems = [...legendItems];
      updatedLegendItems.splice(index, 1);
      setLegendItems(updatedLegendItems);
      if(_id != null){
        auth_store.deleteLegend(_id)
      }
    };

    const handleSave = () => {
      let colors = []
      let texts = []
      for(let i=0; i<customizations.length; i++){
        if(customizations[i].type == 'color'){
          if(customizations[i].value.color != "#3388ff" && customizations[i].value.color != "#ffffff" && customizations[i].value.color != null){
            colors.push(customizations[i])
          }
        }
        else if(customizations[i].type == 'text'){
          texts.push(customizations[i])
        }
      }
      let saveColors = []
      let color = null
      for(let i=colors.length-1; i>=0; i--){
        color = colors[i].value
        for(let j=0; j<saveColors.length; j++){
          if(color.x == saveColors[j].x && color.y == saveColors[j].y){
            color = null
            break
          }
        }

        if(color != null){
          saveColors.push(color)
        }
      }

      let saveTexts = []
      let text = null
      for(let i=texts.length-1; i>=0; i--){
        text = texts[i].value
        for(let j=0; j<saveTexts.length; j++){
          if(text.x == saveTexts[j].x && text.y == saveTexts[j].y){
            text = null
            break
          }
        }

        if(text != null){
          saveTexts.push(text)
        }
      }
      if(saveColors.length != 0){
        auth_store.onColor(saveColors)
      }
      if(saveTexts.length != 0){
        auth_store.onText(saveTexts)
      }

      let saveLegends = []
      for(let i=0; i<legendItems.length; i++){
        if(legendItems[i]._id == null){
          saveLegends.push(legendItems[i])
        }
      }
      if(saveLegends.length != 0){
        auth_store.onLegend(saveLegends)
      }
      alert("Saved successfully!")
    }

    useEffect(() => {
      if(auth_store.selectMap != null){
        setMapData(auth_store.selectMap.mapData)
        setTexts(auth_store.selectMap.texts)
        setColors(auth_store.selectMap.colors)
        setLegendItems(auth_store.selectMap.legends)
      }
    }, [auth_store.selectMap]);
    
    return (
      <div className="MapView-page-container">
        <MapViewDiscussionForum />
          <div className="content">
          {auth_store.isCreatePage ?'':
            <MapViewCustomizeToolbar 
              onFontChange={handleFontChange} 
              onTextChange={handleTextChange} 
              onColorChange={handleColorChange} 
              onUndo={handleUndo}
              onRedo={handleRedo}
              onSave={handleSave}
            />
          }
          <button id="legend-button" type="button" onClick={() => handleShowLegends()}>
                Legend
          </button>
          {isLegendsOpen && (
            <div className="legendsContainer" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* Legend items */}
              {legendItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '30px', marginBottom: '8px', marginleft: '8px',margintop: '10px', width: '200px' }}>
                  {item.color && <div style={{ width: '20px', height: '20px', backgroundColor: item.color, marginRight: '8px' }}></div>}
                  <span>{item.label}</span>
                  {auth_store.isCreatePage ? '':<button onClick={() => handleDeleteLegend(index, item._id)}>Delete</button>}
                </div>
              ))}
        
              {/* Add Legend section */}
              {auth_store.isCreatePage ? '': <div className="legends-Adder" >
                <input type="color" value={newLegend.color} onChange={handleNewLegendColorChang} />
                <input type="text" placeholder="Legend Label" value={newLegend.label} onChange={handleNewLegendLabelChange} />
                <button onClick={handleAddLegend}>Add Legend</button>
              </div>}
            </div>
          )}
          <div id="mapview">
          <MapComponent
            width="1850px"
            height="600px"
            mapData={mapData}
            selectedColor={selectedColor}
            changedText={changedText}
            changedFont={changedFont}
            customization={customization}
            texts={texts}
            colors={colors}
            isCreatePage={auth_store.isCreatePage}
            handleCustomization={handleCustomization}
            />
          </div>
        </div>
      </div>
    );
}
