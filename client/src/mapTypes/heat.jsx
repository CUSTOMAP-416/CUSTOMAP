import { Component } from "react";
import L from "leaflet";
import 'leaflet.heat';

class HeatMap extends Component {
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

  renderMap = () => {
    const geojsonLayer  = this.props.geojsonLayer;
    const map = this.props.map;
    if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
      const layer = L.geoJSON(geojsonLayer, {
        color: "#808080",
        weight: 1,
        fillOpacity: 0,
      });
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      this.props.setGeojsonLayer(layer)
    }

    var heatData = [
        [37.7749, -122.4194, 10000],
        [57.7749, -122.4194, 10000],
        // Add more data points as needed
    ];

    var heatLayerGroup = L.layerGroup().addTo(map);
    heatData.forEach(function(point) {
      var marker = L.marker([point[0], point[1]], { opacity: 0 }).addTo(heatLayerGroup);
      marker.on('click', function(e) {
        console.log('Marker clicked at:', e.latlng.lat, e.latlng.lng);
      });
    });
    L.heatLayer(heatData).addTo(map);
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

export default HeatMap;
