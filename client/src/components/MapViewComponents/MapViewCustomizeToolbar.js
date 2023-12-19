import { useState } from 'react';
import '../../styles/MapView.css';

export default function MapViewCustomizeToolbar({ 
    onFontChange, onTextChange, onColorChange, onUndo, onRedo, onSave, mapType, newXY, setNewXY, label, setLabel, number, setNumber, string, setString, add, layerId, put,isDarkMode
}) {
    const [text, setText] = useState("");
    const [color, setColor] = useState("#ffffff"); // Default color white
    const [showPicker, setShowPicker] = useState(false);

    const handleButtonClick = () => {
        setShowPicker((showPicker) => !showPicker); // Toggle color picker display
    };

    //Handle the Select Font button click.
    const handleSelectFont = (event) => {
        onFontChange(event.target.value);
    };

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        
    };

    const handleAppliedTextChange = () => {
        onTextChange(text);
    }

    //Handle the Select Color button click.
    const handleSelectColor = (event) => {
        const newColor = event.target.value;
        setColor(newColor);
        onColorChange(newColor); 
    };

    const handleNewXChange = (event) => {
        setNewXY({ ...newXY, x: event.target.value });
    };
    const handleNewYChange = (event) => {
        setNewXY({ ...newXY, y: event.target.value });
    };
    const handleLabelChange = (event) =>{
        setLabel(event.target.value)
    }
    const handleNumberChange = (event) =>{
        setNumber(event.target.value)
    }
    const handleStringChange = (event) =>{
        setString(event.target.value)
    }
        
    return (
        <div className={isDarkMode ? 'customize-all-dark' : 'customize-all'}>
            <div className={isDarkMode ? 'myprofile_H-dark' : 'myprofile_H'}>Customize Tools</div>
            <hr className="hr-1"></hr>
            {mapType === 'default' && <div className="customize-toolbar">
                <div className="text-color">
                    <div className="sort-dropdown">
                        <select type="buton" id="text-select" onChange={(e)=>{handleSelectFont(e)}}>
                            <option value="none">Font</option>
                            <option value="Arial" style={{fontFamily: "Arial"}}>Arial</option>
                            <option value="Comic Sans MS" style={{fontFamily: "Comic Sans MS"}}>Comic Sans MS</option>
                            <option value="Brush Script MT" style={{fontFamily: "Brush Script MT"}}>Brush Script MT</option>
                            <option value="Times New Roman" style={{fontFamily: "Times New Roman"}}>Times New Roman</option>
                        </select>
                    </div>
                    <div id="color-button" className="color-picker-container">
                        <button className="color-picker-button" onClick={handleButtonClick}>Pick a Color</button>
                        <div id="color">
                        {showPicker && (<input type="color" className="color-picker" value={color} onChange={handleSelectColor}/>)}
                        </div>
                    </div>
                </div>
                <input data-cy="custom_text" className="custom-textinput" onChange={(event) => handleTextChange(event)}></input>
                <button id="text-save-button" type="button" onClick={() => handleAppliedTextChange()}>Applied Text Change</button>
                <div className="save-option">
                    <div className="icons">
                        <button className="icon-link" onClick={() => onUndo()}>↩</button>
                        <button className="icon-link" onClick={() => onRedo()}>↪</button>    
                    </div>
                    <button id="save-button" type="button" onClick={() => onSave()}>SAVE</button>
                </div>
            </div>}
            {/* ---HEAT MAP-------------------------------------------- */}
            {mapType === 'heat' && <div className='custom-texts'>
                <div className='custom-explain'>
                    Enter latitude and longitude directly, or click on the map to set them.
                    Enter a number between 500 and 5000 and press ADD to display it on the map.
                </div>
                <span className='custom-backg'>
                    Map Background: 
                    <span className='colorPicker-box'>
                        <input type="color" className="color-picker" value={color} onChange={handleSelectColor}/>
                    </span>
                </span>
                Lat:<input className="custom-inputL" type='number' value={newXY.y} onChange={handleNewYChange}/>
                Lng:<input className="custom-inputL" type='number' value={newXY.x} onChange={handleNewXChange}/>
                Number:<input  className="custom-input" type='number' value={number} onChange={handleNumberChange}/>
                Label:<input className="custom-input" type='text' value={label} onChange={handleLabelChange}/>
                <button className="custom-button" type="button" onClick={() => add(newXY.x, newXY.y, label, number)}>Add</button>
                <button className="icon-link2" onClick={() => onUndo()}>↩</button>
                <button className="icon-link2" onClick={() => onRedo()}>↪</button>
                <button id="save-button" type="button" onClick={() => onSave()}>SAVE</button>
            </div>}
            {/* ---POINT MAP-------------------------------------------- */}
            {mapType === 'point' && <div className='custom-texts'>
                <div className='custom-explain'>
                    Enter latitude and longitude directly, or click on the map to set them.
                    Press ADD to display cute Markers ʕ 'ᴥ' ʔ on the map.
                </div>
                <span className='custom-backg'>
                    Map Background: 
                    <span className='colorPicker-box'>
                        <input type="color" className="color-picker" value={color} onChange={handleSelectColor}/>
                    </span>
                </span>
                Lat:<input className="custom-inputL" type='number' value={newXY.y} onChange={handleNewYChange}/>
                Lng:<input className="custom-inputL" type='number' value={newXY.x} onChange={handleNewXChange}/>
                Label:<input className="custom-input" type='text' value={label} onChange={handleLabelChange}/>
                <button className="custom-button" type="button" onClick={() => add(newXY.x, newXY.y, label)}>Add</button>
                <button className="icon-link2" onClick={() => onUndo()}>↩</button>
                <button className="icon-link2" onClick={() => onRedo()}>↪</button>
                <button id="save-button" type="button" onClick={() => onSave()}>SAVE</button>
            </div>}
            {/* ---BUBBLE MAP-------------------------------------------- */}
            {mapType === 'bubble' && <div className='custom-texts'>
                <div className='custom-explain'>
                    Enter latitude and longitude directly, or click on the map to set them.
                    Set Color and Enter the radius(more than 10000). Press ADD to display it on the map.
                </div>
                <span className='custom-backg'>
                    Map Background: 
                    <span className='colorPicker-box'>
                        <input type="color" className="color-picker" value={color} onChange={handleSelectColor}/>
                    </span>
                </span>
                Lat:<input className="custom-inputL" type='number' value={newXY.y} onChange={handleNewYChange}/>
                Lng:<input className="custom-inputL" type='number' value={newXY.x} onChange={handleNewXChange}/>
                <span className='custom-backg'>
                    Color: <input type='color' value={label} onChange={handleLabelChange}/>
                </span>
                Radius:<input className="custom-input" type='number' value={number} onChange={handleNumberChange}/>
                Popup:<input className="custom-input" type='text' value={string} onChange={handleStringChange}/>
                <button className="custom-button" type="button" onClick={() => add(newXY.x, newXY.y, label, number, string)}>Add</button>
                <button className="icon-link2" onClick={() => onUndo()}>↩</button>
                <button className="icon-link2" onClick={() => onRedo()}>↪</button>
                <button id="save-button" type="button" onClick={() => onSave()}>SAVE</button>
            </div>}
            {/* ---THEMATIC MAP-------------------------------------------- */}
            {mapType === 'thematic' && <div className='custom-texts'>
                <div className='custom-explain'>
                    Click on the map to set area.
                    Set Value number OR Open "range" on left side and put display to set Color and Opacity. Press PUT to change the map.
                </div>
                <div className='custom-backg2'>
                    <span className='custom-back-title'> Selected Area </span>
                    <span className='custom-back-line'> || </span>
                    Admin : {layerId.admin} ;  Lat : {newXY.y} ;  Lng : {newXY.x}
                </div>
                Value : <input className="custom-input" type='number' value={label} onChange={handleLabelChange}/>
                <button className="custom-button" type="button" onClick={() => put(label)}>Put</button>
                <button className="icon-link2" onClick={() => onUndo()}>↩</button>
                <button className="icon-link2" onClick={() => onRedo()}>↪</button>
                <button id="save-button" type="button" onClick={() => onSave()}>SAVE</button>
            </div>}
            {/* ---CHOROPLETH MAP-------------------------------------------- */}
            {mapType === 'choropleth' && <div className='custom-texts'>
                <div className='custom-explain'>
                    Click on the map to set area.
                    Set Color and enter ID and Statistic. Press PUT to change the map.
                </div>
                <div className='custom-backg2'>
                    <span className='custom-back-title'> Selected Area </span>
                    <span className='custom-back-line'> || </span>
                    Admin : {layerId.admin} ;  Lat : {newXY.y} ;  Lng : {newXY.x}
                </div>
                <span className='custom-backg' >
                    Color : <input type='color' value={label} onChange={handleLabelChange}/>
                </span>
                 ID : <input className="custom-inputL" type='text' value={number} onChange={handleNumberChange}/>
                 Statistic : <input className="custom-inputL" type='text' value={string} onChange={handleStringChange}/>
                <button className="custom-button" type="button" onClick={() => put(label, number, string)}>Put</button>
                <button className="icon-link2" onClick={() => onUndo()}>↩</button>
                <button className="icon-link2" onClick={() => onRedo()}>↪</button>
                <button id="save-button" type="button" onClick={() => onSave()}>SAVE</button>
            </div>}
        </div>
    );
}