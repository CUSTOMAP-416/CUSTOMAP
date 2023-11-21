import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import '../../styles/MapView.css';

export default function MapViewCustomizeToolbar({ onColorChange }) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff"); // Default color white
  const [showPicker, setShowPicker] = useState(false);

  const handleButtonClick = () => {
    setShowPicker((showPicker) => !showPicker); // Toggle color picker display
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setShowPicker(false); // Hide the color picker after selection
  };

  const { auth_store } = useContext(AuthStoreContextProvider);

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
  const handleShowFonts = () => {};
  //Handle the text button click.
  const handleText = (event) => {
    setSelectedTool(event);
  };
  //Handle the Select Font button click.
  const handleSelectFont = (event) => {
    onText(event);
  };
  //Handle show color list.
  const handleShowColors = () => {};
  //Handle the color button click.
  const handleColor = (event) => {
    setSelectedTool(event);
  };
  //Handle the Select Color button click.
//   const handleSelectColor = (event) => {
//     setColor(event.target.value);
//     onColor(event);
//   };
  const handleSelectColor = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    onColorChange(newColor); // 부모 컴포넌트에 색상 변경 알림
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

  // const updateCountryLabel = (countryName, newLabel) => {
  //     const newGeojson = { ...mapData };
  //     newGeojson.features = newGeojson.features.map(feature => {
  //         if (feature.properties.name === countryName) {
  //             feature.properties.name = newLabel; // Update the label
  //         }
  //         return feature;
  //     });
  //     setGeojson(newGeojson);
  // };

  // // Call this function to update the label of China, for example
  // const handleUpdateLabel = () => {
  //     updateCountryLabel('China', text); // 'text' contains the new label
  // };

  return (
    <div>
      <div class="customize-toolbar">
        {/* <select type="buton" id="text-select">
                    <option value="text1">Text</option>
                    <option value="text2">Anek Devanagari</option>
                    <option value="text3">Anek Gujarati</option>
                    <option value="text4">Anek Gurmukhi</option>
                </select> */}

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
        <input style={{ backgroundColor: "rgb(218, 237, 213)" }}></input>
        <button id="save-button" type="button" onChange={() => handleText()}>
          Applied Change
        </button>
        <button id="save-button" type="button" onClick={() => handleSave()}>
          SAVE
        </button>
      </div>
    </div>
  );
}