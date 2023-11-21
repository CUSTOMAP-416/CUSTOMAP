import { useContext, useState, useEffect } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import '../../styles/MapView.css';

export default function MapViewCustomizeToolbar({ onFontChange, onTextChange, onColorChange }) {
    const { auth_store } = useContext(AuthStoreContextProvider);

    const [text, setText] = useState("");
    const [color, setColor] = useState("#ffffff"); // Default color white
    const [showPicker, setShowPicker] = useState(false);
    const [font, setFont] = useState('');

    const handleButtonClick = () => {
        setShowPicker((showPicker) => !showPicker); // Toggle color picker display
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
        setShowPicker(false); // Hide the color picker after selection
    };

    //function to handle the text process
    const onText = (event) => {
        auth_store.onText(event);
    };
    //function to handle the Color process
    const onColor = (event) => {
        auth_store.onColor(event);
    };
    //function to handle the Legend process
    const onLegend = (event) => {
        auth_store.onLegend(event);
    };

    //'Text', 'Color', 'Legend'
    const [selectedTool, setSelectedTool] = useState("");

    //Handle show font list.
    const handleShowFonts = (e) => {
        // onFontChange(e);
    };
    //Handle the text button click.
    const handleText = (event) => {
        setSelectedTool(event);
    };
    //Handle the Select Font button click.
    const handleSelectFont = (event) => {
        setFont(event.target.value);
        onFontChange(event.target.value);
    };
    //Handle show color list.
    const handleShowColors = () => {};
    //Handle the color button click.
    const handleColor = (event) => {
        setSelectedTool(event);
    };

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        
    };

    const handleAppliedTextChange = () => {
        onTextChange(text);
        onText(text);
    }

    //Handle the Select Color button click.
    //   const handleSelectColor = (event) => {
    //     setColor(event.target.value);
    //     onColor(event);
    //   };
    const handleSelectColor = (event) => {
        const newColor = event.target.value;
        setColor(newColor);
        onColorChange(newColor); 
        onColor(event);
    };
    //Handle show legend list.
    const handleShowLegends = () => {};
    //Handle the legend button click.
    const handleLegend = (event) => {
        setSelectedTool(event);
    };
    //Handle the Change Legend button click.
    const handleChangeLegend = (event) => {
        onLegend(event);
    };

    const handleSave = (event) => {
        setSelectedTool(event);
    };
        
        return (
            <div>
                <div class="customize-toolbar">
                    <select type="buton" id="text-select" onChange={(e)=>{handleSelectFont(e)}}>
                        <option value="none">Font</option>
                        <option value="Arial" style={{fontFamily: "Arial"}}>Arial</option>
                        <option value="Comic Sans MS" style={{fontFamily: "Comic Sans MS"}}>Comic Sans MS</option>
                        <option value="Brush Script MT" style={{fontFamily: "Brush Script MT"}}>Brush Script MT</option>
                        <option value="Times New Roman" style={{fontFamily: "Times New Roman"}}>Times New Roman</option>
                    </select>

            <div id="color-button" className="color-picker-container">
            <button
                className="color-picker-button"
                style={{ backgroundColor: color }}
                onClick={handleButtonClick}
            >
                Pick a Color
            </button>
            {showPicker && (
                <input
                type="color"
                className="color-picker"
                value={color}
                onChange={handleSelectColor}
                />
            )}
            </div>
            <button id="legend-button" type="button" onClick={() => handleLegend()}>
            Legend
            </button>
            <input style={{ backgroundColor: "rgb(218, 237, 213)" }} onChange={(event)=>handleTextChange(event)}></input>
            <button id="save-button" type="button" onClick={() => handleAppliedTextChange()}>
            Applied Change
            </button>
            <button id="save-button" type="button" onClick={() => handleSave()}>
            SAVE
            </button>
        </div>
        </div>
    );
}