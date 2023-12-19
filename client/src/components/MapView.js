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

  const [errorMessage, setErrorMessage] = useState("");
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
    if(customizations.length !== 0){
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
      if(custom.type === 'add'){
        const updatedLayerItems = layerItems.filter((item) => item.date !== custom.value.date);
        setLayerItems(updatedLayerItems);
      }
      else if(custom.type === 'delete'){
        setLayerItems((prevItems) => [...prevItems, custom.value]);
      }
    }
  };
  //Handles the redo button click.
  const handleRedo = () => {
    if(undoCustomizations.length !== 0){
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
      if(custom.type === 'add'){
        setLayerItems((prevItems) => [...prevItems, custom.value]);
      }
      else if(custom.type === 'delete'){
        const updatedLayerItems = layerItems.filter((item) => item.date !== custom.value.date);
        setLayerItems(updatedLayerItems);
      }
    }
  };
  const [selectUser, setSelectUser] = useState("No User");
  const [mapname, setMapname] = useState('');
  const [mapdiscript, setMapdiscript] = useState('');
  const [texts, setTexts] = useState([]);
  const [colors, setColors] = useState([]);
  const [legendItems, setLegendItems] = useState([]);
  const [newLegend, setNewLegend] = useState({ _id: null, color: '#000000', label: '' });
  const handleNewLegendColorChange = (event) => {
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
    if(_id !== null){
      auth_store.deleteLegend(_id)
    }
  };

  const handleSave = () => {
    let colors = []
    let texts = []
    let customs = []
    let deleteCustoms = []
    for(let i=0; i<customizations.length; i++){
      if(customizations[i].type === 'color'){
        if(customizations[i].value.color !== "#3388ff" && customizations[i].value.color !== "#ffffff" && customizations[i].value.color !== null){
          colors.push(customizations[i])
        }
      }
      else if(customizations[i].type === 'text'){
        texts.push(customizations[i])
      }
      else if(customizations[i].type === 'add'){
        customs.push(customizations[i].value)
      }
      else if(customizations[i].type === 'delete'){
        if(customizations[i].value._id !== null){
          deleteCustoms.push({
            _id: customizations[i].value._id
          })
          continue
        }

        customs = customs.filter((item) => !(item.date === customizations[i].value.date));
      }
    }
    let saveColors = []
    let color = null
    for(let i=colors.length-1; i>=0; i--){
      color = colors[i].value
      for(let j=0; j<saveColors.length; j++){
        if(color.x === saveColors[j].x && color.y === saveColors[j].y){
          color = null
          break
        }
      }

      if(color !== null){
        saveColors.push(color)
      }
    }

    let saveTexts = []
    let text = null
    for(let i=texts.length-1; i>=0; i--){
      text = texts[i].value
      for(let j=0; j<saveTexts.length; j++){
        if(text.x === saveTexts[j].x && text.y === saveTexts[j].y){
          text = null
          break
        }
      }

      if(text !== null){
        saveTexts.push(text)
      }
    }
    if(saveColors.length !== 0){
      auth_store.onColor(saveColors)
    }
    if(saveTexts.length !== 0){
      auth_store.onText(saveTexts)
    }

    let saveLegends = []
    for(let i=0; i<legendItems.length; i++){
      if(legendItems[i]._id === null){
        saveLegends.push(legendItems[i])
      }
    }
    if(saveLegends.length !== 0){
      auth_store.onLegend(saveLegends)
    }
    // font
    if(auth_store.selectMap.font !== changedFont){
      auth_store.onFont(changedFont)
    }
    // backgroudColor
    if(selectedMapType === 'heat' || selectedMapType === 'point' || selectedMapType === 'bubble'){
      if(auth_store.selectMap.backgroundColor !== selectedColor){
        auth_store.onBackgroundColor(selectedColor)
      }
    }
    //save customs
    if(customs.length !== 0 || deleteCustoms.length !== 0){
      auth_store.onCustom(customs, deleteCustoms)
    }
    //thematicLegends
    if(selectedMapType === 'thematic'){
      for(let i=0; i<8; i++){
        if(auth_store.selectMap.thematicLegends[i].value !== legendItems[i].value){
          auth_store.onThematicLegends(legendItems)
          break;
        }
        if(auth_store.selectMap.thematicLegends[i].color !== legendItems[i].color){
          auth_store.onThematicLegends(legendItems)
          break;
        }
        if(auth_store.selectMap.thematicLegends[i].visibility !== legendItems[i].visibility){
          auth_store.onThematicLegends(legendItems)
          break;
        }
        if(auth_store.selectMap.thematicLegends[i].opacity !== legendItems[i].opacity){
          auth_store.onThematicLegends(legendItems)
          break;
        }
      }
    }

    setCustomizations([])
    setUndoCustomizations([])
    alert("Saved successfully!")
  }
  // other type map
  const [selectedMapType, setSelectedMapType] = useState('default');
  const [newXY, setNewXY] = useState({ x: '', y: '' });
  const handleNewXY = (x, y) => {
    setNewXY({ x: x, y: y });
  };
  const [layerId, setLayerId] = useState({ id: '', admin: '' });
  const handleLayerId = (id, admin) => {
    setLayerId({ id: id, admin: admin });
  };
  const [label, setLabel] = useState('');
  const [number, setNumber] = useState('');
  const [string, setString] = useState('');

  const [layerItems, setLayerItems] = useState([]);
  const add = (x, y, label, number, string) => {
    if(!(y==='') && !isNaN(y) && isFinite(y) && !(x==='') && !isNaN(x) && isFinite(x) && y >= -90 && y <= 90 && x >= -180 && x <= 180){
      x=parseFloat(x)
      y=parseFloat(y)
      number=parseFloat(number)
      if(layerItems.some((item) => item.x === x && item.y === y)){
        setErrorMessage("The 'lat' 'lng' already exists.")
        setTimeout(() => {
          setErrorMessage("")
        }, 5000);
      }
      else{
        let newItem = null
        if(selectedMapType === 'heat'){
          if(!isNaN(number) && isFinite(number)){
            newItem = {
              _id: null,
              x: x,
              y: y,
              number: number,
              label: label,
              date: Date.now()
            }
          }
          else{
            setErrorMessage("'number' are not numbers.")
            setTimeout(() => {
              setErrorMessage("")
            }, 5000);
          }
        }
        else if(selectedMapType === 'point'){
          newItem = {
            _id: null,
            x: x,
            y: y,
            label: label,
            date: Date.now()
          }
        }
        else {
          if(!isNaN(number) && isFinite(number)){
            newItem = {
              _id: null,
              x: x,
              y: y,
              label: label,
              number: number,
              string: string,
              date: Date.now()
            }
          }
          else{
            setErrorMessage("'radius' are not numbers.")
            setTimeout(() => {
              setErrorMessage("")
            }, 5000);
          }
        }
        if(newItem !== null){
          setCustomization({
            redoUndo: 'add',
            custom: newItem
          })
          setLayerItems((prevItems) => [...prevItems, newItem]);
          const state = {
            type: 'add',
            value: newItem
          }
          handleCustomization(state)
        }
      }
    }
    else{
      setErrorMessage("'lat' or 'lng' are not numbers. Or 'lat' exceeds the interval (-90, 90) or 'lng' exceeds the interval (-180, 180).")
      setTimeout(() => {
        setErrorMessage("")
      }, 10000);
    }
  };

  const put = (value, ID, Statistic) => {
    if(layerId.id === ''){
      setErrorMessage("Please select a country.")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000);
    }
    else{
      if(layerItems.some((item) => item.x === newXY.x && item.y === newXY.y)){
        setErrorMessage("You have already 'put' this country, please delete it and then 'put' it again.")
        setTimeout(() => {
          setErrorMessage("")
        }, 5000);
      }
      else{
        let newItem =null
        if(selectedMapType === 'thematic'){
          if(!isNaN(value) && isFinite(value)){
            newItem = {
              _id: null,
              id: layerId.id,
              label: layerId.admin,
              x: newXY.x,
              y: newXY.y,
              number: value,
              date: Date.now()
            }
          }
          else{
            setErrorMessage("'value' are not numbers.")
            setTimeout(() => {
              setErrorMessage("")
            }, 5000);
          }
        }
        else{
          newItem = {
            _id: null,
            id: layerId.id,
            lable: layerId.admin,
            x: newXY.x,
            y: newXY.y,
            color: value,
            value: ID,
            string: Statistic,
            date: Date.now()
          }
        }
        if(newItem !== null){
          setCustomization({
            redoUndo: 'add',
            custom: newItem
          })
          setLayerItems((prevItems) => [...prevItems, newItem]);
          const state = {
            type: 'add',
            value: newItem
          }
          handleCustomization(state)
        }
      }
    }
  }

  const handleDeletelayer = (date) => {
    const updatedLayerItems = layerItems.filter((item) => {
        if(item.date === date){
          if(auth_store.selectMap.mapType === 'thematic' || auth_store.selectMap.mapType === 'choropleth'){
            setCustomization({
              redoUndo: 'delete',
              custom: {
                id: item.id,
                x: item.x,
                y: item.y,
              },
            })
          }
          else{
            setCustomization({
              redoUndo: 'delete',
              custom: {
                x: item.x,
                y: item.y,
              },
            })
          }
          const state = {
            type: 'delete',
            value: item
          }
          handleCustomization(state)
          return false
        }
        return true;
      });
      setLayerItems(updatedLayerItems);
  };

  const [view, setView] = useState({ x: '', y: '' });
  const setMapView = (x, y) => {
    setView({x: x, y: y})
  };

  const [legendChanged, setLegendChanged] = useState(false);

  const handleLegendValueChange = (index, newValue) => {
    if(!legendChanged){
      setLegendChanged(true)
    }
    const updatedItems = [...legendItems];
    updatedItems[index].value = newValue;
    setLegendItems(updatedItems);
  };

  const handleLegendColorChange = (index, newColor) => {
    if(!legendChanged){
      setLegendChanged(true)
    }
    const updatedItems = [...legendItems];
    updatedItems[index].color = newColor;
    setLegendItems(updatedItems);
  };

  const handleLegendOpacityChange = (index, newOpacity) => {
    if(!legendChanged){
      setLegendChanged(true)
    }
    const updatedItems = [...legendItems];
    updatedItems[index].opacity = newOpacity;
    setLegendItems(updatedItems);
  };

  const handleLegendVisibilityChange = (index) => {
    if(!legendChanged){
      setLegendChanged(true)
    }
    const updatedItems = [...legendItems];
    updatedItems[index].visibility = !updatedItems[index].visibility;
    setLegendItems(updatedItems);
  };

  const handleSetLegends = () => {
    if(!legendChanged){
      return
    }
    for(let i=1; i<legendItems.length; i++){
      if(isNaN(legendItems[i].value)){
        setErrorMessage(`${legendItems[i].value} are not numbers.`)
          setTimeout(() => {
            setErrorMessage("")
          }, 5000);
      }
      if(parseFloat(legendItems[i].value)<=parseFloat(legendItems[i-1].value)){
        setErrorMessage(`${legendItems[i].value} <= ${legendItems[i-1].value}`)
        setTimeout(() => {
          setErrorMessage("")
        }, 5000);
        return
      }
    }
    setCustomization({
      redoUndo: 'legend',
    })
  };

  useEffect(() => {
    if(auth_store.selectMap){
      setMapData(auth_store.selectMap.mapData)
      setTexts(auth_store.selectMap.texts)
      setColors(auth_store.selectMap.colors)
      if(auth_store.selectMap.mapType === 'thematic'){
        let thematicLegends = []
        let thematicLegend = ''
        for (let i=0; i<8; i++){
          thematicLegend = {
            value: auth_store.selectMap.thematicLegends[i].value, 
            color: auth_store.selectMap.thematicLegends[i].color, 
            visibility: auth_store.selectMap.thematicLegends[i].visibility, 
            opacity: auth_store.selectMap.thematicLegends[i].opacity,
          }
          thematicLegends.push(thematicLegend)
        }
        setLegendItems(thematicLegends)
      }
      else{
        setLegendItems(auth_store.selectMap.legends)
      }
      setMapname(auth_store.selectMap.title)
      setMapdiscript(auth_store.selectMap.description)
      setSelectUser(auth_store.selectName);
      setSelectedMapType(auth_store.selectMap.mapType)
      setChangedFont(auth_store.selectMap.font)
      setSelectedColor(auth_store.selectMap.backgroundColor)
      setLayerItems(auth_store.selectMap.customs)
      if((auth_store.selectMap.mapType === 'bubble' || auth_store.selectMap.mapType === 'choropleth') && label === ''){
        setLabel("#ffffff")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_store.selectMap]);
  
  const [isOpen, setIsOpen] = useState(false);
      
        const toggleSidebar = () => {
          setIsOpen(!isOpen);
  };

  const [isDarkMode, setIsDarkMode] = useState(false); 
    const handleToggle = () => {
      setIsDarkMode(!isDarkMode);
    };
  
  return (
    <div className={`MapView-page-container ${isDarkMode ? 'MapView-page-container-dark' : 'MapView-page-container'}`}>
      <MapViewDiscussionForum />
        <div className={`content ${isDarkMode ? 'content-dark' : 'content'}`}>
        {auth_store.isCreatePage ?
          <div className='mapview-contain'>
            <div className={`mapview-title ${isDarkMode ? 'mapview-title-dark' : 'mapview-title'}`}>
              <div className={`mapview-header ${isDarkMode ? 'mapview-header-dark' : 'mapview-header'}`}>TITLE : &nbsp;&nbsp;&nbsp;&nbsp;</div>
              {mapname || "No Name"}
            </div>
            <div className={`mapview-title ${isDarkMode ? 'mapview-title-dark' : 'mapview-title'}`}>
              <div className={`mapview-header ${isDarkMode ? 'mapview-header-dark' : 'mapview-header'}`}>Description : &nbsp;&nbsp;&nbsp;&nbsp;</div>
              {mapdiscript || "No Discript"}
            </div>
            <div className={`mapview-title ${isDarkMode ? 'mapview-title-dark' : 'mapview-title'}`}>
              <div className={`mapview-header ${isDarkMode ? 'mapview-header-dark' : 'mapview-header'}`}>By : &nbsp;&nbsp;&nbsp;&nbsp;</div>
              {selectUser|| "No User"}
            </div>
            <div className={`mapview-title ${isDarkMode ? 'mapview-title-dark' : 'mapview-title'}`}>
                </div>
          </div>
          :
          <div>
            <MapViewCustomizeToolbar 
              onFontChange={handleFontChange} 
              onTextChange={handleTextChange} 
              onColorChange={handleColorChange} 
              onUndo={handleUndo}
              onRedo={handleRedo}
              onSave={handleSave}
              mapType={selectedMapType}
              newXY={newXY}
              setNewXY={setNewXY}
              label={label} 
              setLabel={setLabel}
              number={number}
              setNumber={setNumber}
              string={string}
              setString={setString}
              add={add}
              layerId={layerId}
              put={put}
              isDarkMode={isDarkMode}
            />
          </div>
          
          
        }
         
        {selectedMapType === 'thematic'  ? 
          <div className={`thematic-sidebar-container ${isOpen ? 'open' : ''}`}>
            <button className="thematic-toggle-button" onClick={toggleSidebar}>
                    {isOpen ? 'range <' : 'range >'}
                </button>
            <div className='thematic-menu'>
             
            <div></div>
            {legendItems.map((item,index) => {
            
            if(index === 0) {
              
              return <div key={index}>
                <div className='thematic-container'>
                  <label>Value:<input type="text" value={'-inf'} disabled></input></label>
                  <label>Color:<input type="color" value={item.color}
                      onChange={(e) => handleLegendColorChange(index, e.target.value)}/>
                  </label>
                  <label>Opacity:<input type="number" min="0" max="1" step="0.01" value={item.opacity}
                      onChange={(e) => handleLegendOpacityChange(index, e.target.value)}/>
                  </label>
                </div>
              </div>
                      
            }
            return <div key={index}>
              <div className='thematic-container'>
                    <label>Value:<input type="number" value={item.value}
                        onChange={(e) => handleLegendValueChange(index, e.target.value)}/>
                      </label>
                      <label>Color:<input type="color" value={item.color}
                          onChange={(e) => handleLegendColorChange(index, e.target.value)}/>
                      </label>
                      <label>Opacity:<input type="number" min="0" max="1" step="0.01" value={item.opacity}
                          onChange={(e) => handleLegendOpacityChange(index, e.target.value)}/>
                      </label>
                      <button className='display' type="button" onClick={() => handleLegendVisibilityChange(index)}>{item.visibility?'display':'hide'}</button>
                    </div>

              </div>
                    
          }
          )}
          <button className='update' type="button" onClick={() => handleSetLegends()}>Undate Legends</button>
          </div>
             </div>
          
          : ''
        }
        {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
        <div id="mapview-container" style={{display: "flex", gap: "20px"}}>
          <div id="mapview" style={{width: "80%"}}>
            <MapComponent
              width="100%"
              height="600px"
              mapType={selectedMapType}
              mapData={mapData}
              selectedColor={selectedColor}
              changedText={changedText}
              changedFont={changedFont}
              customization={customization}
              texts={texts}
              colors={colors}
              isCreatePage={auth_store.isCreatePage}
              handleCustomization={handleCustomization}
              handleNewXY={handleNewXY}
              view={view}
              handleLayerId={handleLayerId}
              legendItems={legendItems}
              layerItems={layerItems}
              />
          </div>
          <div className={`rightside-for-legend ${isDarkMode ? 'rightside-for-legend-dark' : 'rightside-for-legend'}`} style={{height: '550px',  overflow: 'auto'}}>
          {selectedMapType === 'default' &&
          <div>
            <div style={{display: "flex", justifyContent:"center"}}>
              <div>
                  Legend
              </div>
            </div>
            <div className="legendsContainer" style={{ display: 'flex', flexWrap: 'wrap'}}>
              {/* Legend items */}
              {legendItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', marginleft: '10px',margintop: '10px', width: '200px', justifyContent: "space-between" }}>
                  {item.color && <div style={{ width: '20px', height: '20px', backgroundColor: item.color, marginRight: '8px' }}></div>}
                  <span style={{fontSize: "15px"}}>{item.label}</span>
                  {auth_store.isCreatePage ? '':<button className='customize-legend-del-button' style={{width: "17%", height: "28px", fontSize:"15px", fontWeight: "bolder", fontFamily: "Arial"}} onClick={() => handleDeleteLegend(index, item._id)}>-</button>}
                </div>
              ))}
              {/* Add Legend section */}
              {auth_store.isCreatePage ? '': <div className="legends-Adder" >
                <input className="customize-color"  style={{width: "16%"}} type="color" value={newLegend.color} onChange={handleNewLegendColorChange} />
                <input className="customize-text-box" type="text" placeholder="Legend Label" value={newLegend.label} onChange={handleNewLegendLabelChange} />
                <button  className='customize-legend-button' onClick={handleAddLegend} style={{width: "20%", height: "28px", fontSize:"15px", fontWeight: "bolder", fontFamily: "Arial"}}>+</button>
              </div>}
            </div>
          </div>}
          {selectedMapType === 'heat' &&
          <div>{layerItems.map((item) => {
            return <div key={item.date}>
                    <div className="data-container" onClick={() => setMapView(item.x, item.y)}>
                      <li className='view'>Lat: {item.y} <br /> Lng: {item.x}</li>
                      <li className='view'>Number: {item.number}</li>
                      <li className='view'>Label: {item.label}</li>
                    </div>
                    {auth_store.isCreatePage ? '':<button className='mv-delete' onClick={() => handleDeletelayer(item.date)}>Delete</button>}
                  </div>
            })}</div>}
          {selectedMapType === 'point' &&
          <div>{layerItems.map((item) => {
            return <div key={item.date}>
                    <div className="data-container" onClick={() => setMapView(item.x, item.y)}>
                      <li className='view'>Lat: {item.y} <br /> Lng: {item.x}</li>
                      <li className='view'>Label: {item.label}</li>
                    </div>
                    {auth_store.isCreatePage ? '':<button className='mv-delete' onClick={() => handleDeletelayer(item.date)}>Delete</button>}
                  </div>
            })}</div>}
          {selectedMapType === 'bubble' &&
          <div>{layerItems.map((item) => {
            return <div key={item.date}>
                    <div className="data-container" onClick={() => setMapView(item.x, item.y)}>
                      <li className='view'>Lat: {item.y} <br /> Lng: {item.x}</li>
                      <li className='view'>Color: {item.label}</li>
                      <li className='view'>Radius: {item.number}</li>
                      <li className='view'>Popup: {item.string}</li>
                    </div>
                    {auth_store.isCreatePage ? '':<button className='mv-delete' onClick={() => handleDeletelayer(item.date)}>Delete</button>}
                  </div>
            })}</div>}
          {selectedMapType === 'thematic' &&
          <div>{layerItems.map((item) => {
            return <div key={item.date}>
                    <div className="data-container" onClick={() => setMapView(item.x, item.y)}>
                      <li className='view'>Admin: {item.label} <br /> Lat: {item.y} <br /> Lng: {item.x}</li>
                      <li className='view'>Value: {item.number}</li>
                    </div>
                    {auth_store.isCreatePage ? '':<button className='mv-delete' onClick={() => handleDeletelayer(item.date)}>Delete</button>}
                  </div>
            })}</div>}
          {selectedMapType === 'choropleth' &&
          <div>{layerItems.map((item) => {
            return <div key={item.date}>
                    <div className="data-container" onClick={() => setMapView(item.x, item.y)}>
                      <li className='view'>Admin: {item.label}<br />  Lat: {item.y} <br /> Lng: {item.x}</li>
                      <li className='view'>Color: {item.color}</li>
                      <li className='view'>ID: {item.value}</li>
                      <li className='view'>Statistic: {item.string}</li>
                    </div>
                    {auth_store.isCreatePage ? '':<button className='mv-delete' onClick={() => handleDeletelayer(item.date)}>Delete</button>}
                  </div>
            })}</div>}
          </div>
        </div>
        <div className={`mapview-header ${isDarkMode ? 'mapview-header-dark' : 'mapview-header'}`}>Dark Mode</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={handleToggle}
                        />
                        <span className="slider"></span>
                    </label>
      </div>
      
    </div>
  );
}
