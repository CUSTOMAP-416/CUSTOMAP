import React, { Component } from "react";
import L, { marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Discuss.css";
import "./styles/MapView.css";
import 'leaflet-easyprint';

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      geojsonLayer: null, // Store the GeoJSON layer
      selectedLayer: null,
      changedText: "",
      changedFont: "",
      selectedColor: "#ffffff", // default: white
      paintedLayers: {},
    };
    this.mapContainerRef = React.createRef();
    this.mapInitialized = false; // Track if the map has been initialized
  }

  componentDidMount() {
    this.setState({
      legendItems: this.props.legends,
    })
    if (!this.mapInitialized) {
      // Initialize Leaflet map only if it hasn't been initialized
      const map = L.map(this.mapContainerRef.current).setView(
        [40.915734, 286.87721],
        13
      );
      map.removeControl(map.zoomControl);
      // Add a tile layer (you can choose a suitable one)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.marker([40.915734, 286.87721]).addTo(map);

      // Set the map object in the component state
      this.setState({ map });

      // Mark the map as initialized
      this.mapInitialized = true;
    }
  }

  loadFile = (geojson) => {
    this.clearmap();
    this.setState({ geojsonLayer: geojson });
    setTimeout(() => {
      this.renderMap();
    }, 100);
  };
  //-------------------color mouse hover --------------------
  highlightFeature = (e) => {
    const layer = e.target;
    if (!this.state.paintedLayers[L.stamp(layer)]) {
      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.3,
      });
    }
  };

  // Initialize the style when the mouse is out of the polygon
  resetHighlight = (e) => {
    const layer = e.target;
    if (!this.state.paintedLayers[L.stamp(layer)]) {
      layer.setStyle({
        weight: 1,
        color: "#808080",
        fillColor: "",
        fillOpacity: 0,
      });
    }
  };

  handleSelectColor = (event) => {
    this.setState({ selectedColor: event.target.value });
  };
//-------------------onEachFeature --------------------
  onEachFeature = (feature, layer) => {
    if (feature.properties.admin != null) {
      let text = feature.properties.admin
      for(let i=0; i<this.props.texts.length; i++){
        if(this.props.texts[i].x==feature.properties.label_x && this.props.texts[i].y==feature.properties.label_y){
          text = this.props.texts[i].text;
          break;
        }
      }
      const label = L.divIcon({
        className: "label",
        html: `<div>${text}</div>`,
      });
      // Create a marker with the label and add it to the map
      var marker = L.marker([feature.properties.label_y, feature.properties.label_x], {
                        icon: label,
                    });
      // Add the marker to the map
      this.state.map.addLayer(marker)
    }

    for(let i=0; i<this.props.colors.length; i++){
      if(this.props.colors[i].x==feature.properties.label_x && this.props.colors[i].y==feature.properties.label_y){
        layer.setStyle({
          fillColor: this.props.colors[i].color,
          fillOpacity: 0.2,
          weight: 1,
        });
        this.setState((prevState) => {
          return {paintedLayers: {
            ...prevState.paintedLayers,
            [L.stamp(layer)]: true,
          }};
        });
        break;
      }
    }
    if(!this.props.isCreatePage){
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: (e) => {
          const currentLayer = e.target;
          const layerId = L.stamp(currentLayer); // Unique ID for each polygon
          let state = null;

          if (currentLayer.options.fillOpacity === 0.2) {
            let state = {
              type: 'color',
              id: layerId,
              previous: currentLayer.options.fillColor,
              value: {
                color: "",
                x: feature.properties.label_x,
                y: feature.properties.label_y,
              }
            }
            this.props.handleCustomization(state)
            // Remove color if already painted polygon is clicked
            currentLayer.setStyle({
              fillColor: "", // remove Fill color
              fillOpacity: 0, // Fill opacity 0
            });
            this.setState((prevState) => {
              return {paintedLayers: { 
                ...prevState.paintedLayers,
                [layerId]: false,
              }};
            });
          } 
          else {
            state = {
              type: 'color',
              id: layerId,
              previous: currentLayer.options.fillColor,
              value: {
                color: this.props.selectedColor,
                x: feature.properties.label_x,
                y: feature.properties.label_y,
              }
            }
            this.props.handleCustomization(state)
            // If you click on a new polygon, apply the selected color
            currentLayer.setStyle({
              fillColor: this.props.selectedColor,
              fillOpacity: 0.2,
              weight: 1,
            });
            this.setState((prevState) => {
              return {paintedLayers: {
                ...prevState.paintedLayers,
                [layerId]: true,
              }};
            });
          }

          if(this.props.changedText && marker._icon.innerText != this.props.changedText){
            state = {
              type: 'text',
              id: marker._leaflet_id,
              previous: marker._icon.innerText,
              value: {
                text: this.props.changedText,
                x: feature.properties.label_x,
                y: feature.properties.label_y,
              }
            }
            this.props.handleCustomization(state)
            this.updateLabel(currentLayer, marker, feature, this.props.changedText);
          }
        },
      });
    }
  };

  updateLabel = (layer, marker, feature, text) => {
      if (feature.properties.admin != null) {
        const label = L.divIcon({
          className: "label",
          html: `<div>${text}</div>`,
      });
      
      marker.setIcon(label);
      }
  };


  renderMap = () => {
    const { map, geojsonLayer } = this.state;
    if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
      const layer = L.geoJSON(geojsonLayer, {
        onEachFeature: this.onEachFeature,
        color: "#808080",
        weight: 1,
        fillOpacity: 0,
      });
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      this.setState({ geojsonLayer: layer });
    }

    if(!this.props.isCreatePage){
      function manualPrint() {
        var printer = L.easyPrint({
          filename: 'myMap',
          exportOnly: true,
          hideControlContainer: true,
          hidden: true,
        }).addTo(map);
        printer.printMap('CurrentSize', 'MyManualPrint')
      }
      document.getElementById("png-option").addEventListener("click", manualPrint);
    }
    if(!this.props.isCreatePage){
      function manualPrintpdf() {
        var printer = L.easyPrint({
          filename: 'myMap',
          hidden: true,
        }).addTo(map);
        printer.printMap('CurrentSize', 'MyManualPrint')
      }
      document.getElementById("pdf-option").addEventListener("click", manualPrintpdf);
    }

    if (!this.props.isCreatePage) {
      
      function manualExportJson() {
        exportMapToJson(map, geojsonLayer);
      }
    
      document.getElementById("json-option").addEventListener("click", manualExportJson);
    }
    
    
    const exportMapToJson = (map, geojsonLayer) => {
      if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
       
        const geojsonStr = JSON.stringify(geojsonLayer);
    
       
        const blob = new Blob([geojsonStr], { type: "application/json" });
    
        // 生成一个下载链接
        const url = URL.createObjectURL(blob);
    
       
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "mapData.json";
    
        
        downloadLink.click();
    
        
        URL.revokeObjectURL(url);
      }
    };

    
  };
  
  
  updateFont = () => {
    const elements = document.getElementsByClassName("label");

    // Loop through each element and change the font-family style
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontFamily = this.props.changedFont;
    }
  };
  

  clearmap = () => {
    const { map, geojsonLayer } = this.state;
    if (geojsonLayer) {
      map.removeLayer(geojsonLayer);

      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      this.setState({ geojsonLayer: null });
    }
  };

  undo = (customization) => {
    if(customization.type == 'color'){
      let layer=this.state.geojsonLayer.getLayer(customization.id)
      if(customization.previous == "#808080" || customization.value.color == "#ffffff" || customization.previous == null){
        layer.setStyle({
          fillColor: "",
          fillOpacity: 0,
        });
        this.setState((prevState) => {
          return {paintedLayers: { 
            ...prevState.paintedLayers,
            [L.stamp(layer)]: false,
          }};
        });
      }
      else{
        layer.setStyle({
          fillColor: customization.previous,
          fillOpacity: 0,
          weight: 1,
        });
        this.setState((prevState) => {
          return {paintedLayers: {
            ...prevState.paintedLayers,
            [L.stamp(layer)]: true,
          }};
        });
      }
    }
    else if(customization.type == 'text'){
      const id = customization.id
      const text = customization.previous
      this.state.map.eachLayer(function(layer){
        if(layer._leaflet_id == id){
          const label = L.divIcon({
            className: "label",
            html: `<div>${text}</div>`,
          });
          layer.setIcon(label);
          return;
        }
      });
    }
  }

  redo = (customization) => {
    if(customization.type == 'color'){
      let layer=this.state.geojsonLayer.getLayer(customization.id)
      if(customization.value.color == "#808080" || customization.value.color == "#ffffff" || customization.value.color == null){
        layer.setStyle({
          fillColor: "",
          fillOpacity: 0,
        });
        this.setState((prevState) => {
          return {paintedLayers: { 
            ...prevState.paintedLayers,
            [L.stamp(layer)]: false,
          }};
        });
      }
      else{
        layer.setStyle({
          fillColor: customization.value.color,
          fillOpacity: 0.2,
          weight: 1,
        });
        this.setState((prevState) => {
          return {paintedLayers: {
            ...prevState.paintedLayers,
            [L.stamp(layer)]: true,
          }};
        });
      }
    }
    else if(customization.type == 'text'){
      const id = customization.id
      const text = customization.value.text
      this.state.map.eachLayer(function(layer){
        if(layer._leaflet_id == id){
          const label = L.divIcon({
            className: "label",
            html: `<div>${text}</div>`,
          });
          layer.setIcon(label);
          return;
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mapData !== this.props.mapData) {
      this.loadFile(this.props.mapData);
    }
    if (prevProps.changedFont !== this.props.changedFont) {
      this.updateFont();
    }
    if (prevProps.customization !== this.props.customization){
      if(this.props.customization.redoUndo == 'redo'){
        this.redo(this.props.customization.custom)
      }
      else if(this.props.customization.redoUndo == 'undo'){
        this.undo(this.props.customization.custom)
      }
    } 
  }


  render() {
    const { style, width, height } = this.props;
    const mapStyle = style || {
      height: height || "500px",
      width: width || "100%",
    };
    return (
      <div id="map-container">
        <>
          {/* <!-- Import the LEAFLET CSS filr here--> */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
            integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
            crossOrigin=""
          />
          {/* <!-- Make sure you put this AFTER Leaflet's CSS --> */}
          <script
            src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
            integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
            crossOrigin=""
          ></script>
        </>
        <div id="main-map" ref={this.mapContainerRef} style={mapStyle}></div>
        
      </div>
    );
  }
}

export default MapComponent;
