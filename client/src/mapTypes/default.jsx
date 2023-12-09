import { Component } from "react";
import L from "leaflet";

class DefaultMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintedLayers: {},
    };
  }

  componentDidMount() {
    this.clearmap()
  }

  loadFile = (geojson) => {
    this.clearmap();
    this.props.setGeojsonLayer(geojson)
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

//-------------------onEachFeature --------------------
  onEachFeature = (feature, layer) => {
    if (feature.properties.admin != null) {
      let text = feature.properties.admin
      for(let i=0; i<this.props.props.texts.length; i++){
        if(this.props.props.texts[i].x==feature.properties.label_x && this.props.props.texts[i].y==feature.properties.label_y){
          text = this.props.props.texts[i].text;
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
      this.props.map.addLayer(marker)
    }

    for(let i=0; i<this.props.props.colors.length; i++){
      if(this.props.props.colors[i].x==feature.properties.label_x && this.props.props.colors[i].y==feature.properties.label_y){
        layer.setStyle({
          fillColor: this.props.props.colors[i].color,
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
    if(!this.props.props.isCreatePage){
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
            this.props.props.handleCustomization(state)
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
            if(this.props.props.handleCustomization){
              state = {
                type: 'color',
                id: layerId,
                previous: currentLayer.options.fillColor,
                value: {
                  color: this.props.props.selectedColor,
                  x: feature.properties.label_x,
                  y: feature.properties.label_y,
                }
              }
              this.props.props.handleCustomization(state)
              // If you click on a new polygon, apply the selected color
              currentLayer.setStyle({
                fillColor: this.props.props.selectedColor,
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
          }

          if(this.props.props.changedText && marker._icon.innerText != this.props.props.changedText){
            state = {
              type: 'text',
              id: marker._leaflet_id,
              previous: marker._icon.innerText,
              value: {
                text: this.props.props.changedText,
                x: feature.properties.label_x,
                y: feature.properties.label_y,
              }
            }
            this.props.props.handleCustomization(state)
            this.updateLabel(currentLayer, marker, feature, this.props.props.changedText);
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
    const geojsonLayer  = this.props.geojsonLayer;
    const map = this.props.map
    if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
      const layer = L.geoJSON(geojsonLayer, {
        onEachFeature: this.onEachFeature,
        color: "#808080",
        weight: 1,
        fillOpacity: 0,
      });
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      this.props.setGeojsonLayer(layer)
    }
  };
  
  updateFont = () => {
    const elements = document.getElementsByClassName("label");

    // Loop through each element and change the font-family style
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontFamily = this.props.props.changedFont;
    }
  };
  
  clearmap = () => {
    const geojsonLayer  = this.props.geojsonLayer;
    const map = this.props.map
    if (geojsonLayer) {
      map.removeLayer(geojsonLayer);

      map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          map.removeLayer(layer);
        }
      });

      this.props.setGeojsonLayer(null)
    }
  };

  undo = (customization) => {
    if(customization.type == 'color'){
      let layer=this.props.geojsonLayer.getLayer(customization.id)
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
      const text = customization.previous
      this.props.map.eachLayer(function(layer){
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
      let layer=this.props.geojsonLayer.getLayer(customization.id)
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
      this.props.map.eachLayer(function(layer){
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
    if (prevProps.props.mapData !== this.props.props.mapData || prevProps.mapType !== this.props.mapType) {
      this.loadFile(this.props.props.mapData);
    }
    if (prevProps.props.changedFont !== this.props.props.changedFont) {
      this.updateFont();
    }
    if (prevProps.props.customization !== this.props.props.customization){
      if(this.props.props.customization.redoUndo == 'redo'){
        this.redo(this.props.props.customization.custom)
      }
      else if(this.props.props.customization.redoUndo == 'undo'){
        this.undo(this.props.props.customization.custom)
      }
    } 
  }


  render() {
    return null
  }
}

export default DefaultMap;
