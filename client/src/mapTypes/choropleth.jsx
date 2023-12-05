import { Component } from "react";
import L from "leaflet";

class BubbleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.clearmap()
  }

  loadFile = (geojson) => {
    this.clearmap();
    this.props.setGeojsonLayer(geojson);
    setTimeout(() => {
      this.renderMap();
    }, 100);
  };

  onEachFeature = (feature, layer) => {
    layer.bindPopup('ID: ' + feature.properties.admin + '<br>Statistic: ' + feature.properties.admin);
  }

  renderMap = () => {
    const geojsonLayer  = this.props.geojsonLayer;
    const map = this.props.map;
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.props.mapData !== this.props.props.mapData) {
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

export default BubbleMap;
