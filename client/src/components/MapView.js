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
      // this.forceUpdate();
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

    useEffect(() => {
        if(auth_store.selectMap != null){
            setMapData(auth_store.selectMap.mapData)
        }
    }, [auth_store.selectMap]);
    
    return (
      <div className="MapView-page-container">
        <MapViewDiscussionForum />
        <div className="content">
          <MapViewCustomizeToolbar onFontChange={handleFontChange} onTextChange={handleTextChange} onColorChange={handleColorChange} />
          <MapComponent
            width="1400px"
            height="600px"
            mapData={mapData}
            selectedColor={selectedColor}
            changedText={changedText}
            changedFont={changedFont}
          />
        </div>
      </div>
    );
}