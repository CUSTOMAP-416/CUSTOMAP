import { Component } from "react";
import L from "leaflet";

class ChoroplethMap extends Component {
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
    this.props.setGeojsonLayer(geojson);
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
    for(let i=0; i<this.props.props.layerItems.length; i++){
      if(this.props.props.layerItems[i].x==feature.properties.label_x && this.props.props.layerItems[i].y==feature.properties.label_y){
        layer.setStyle({
          fillColor: this.props.props.layerItems[i].color,
          fillOpacity: 0.2,
          weight: 1,
        });
        layer.bindPopup('ID: ' + this.props.props.layerItems[i].value + '<br>Statistic: ' + this.props.props.layerItems[i].string);
        this.setState((prevState) => {
          return {paintedLayers: {
            ...prevState.paintedLayers,
            [L.stamp(layer)]: true,
          }};
        });
        break;
      }
    }
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: (e) => {
        const currentLayer = e.target;
        const layerId = L.stamp(currentLayer);
        if (!this.state.paintedLayers[layerId]) {
          currentLayer.setStyle({
            color: 'red',
            fillOpacity: 0,
            weight: 1,
          });
          this.setState((prevState) => {
            return {paintedLayers: {
              ...prevState.paintedLayers,
              [layerId]: false,
            }};
          });
        }
        else{
          this.props.changeView(feature.properties.label_y, feature.properties.label_x)
        }

        if(this.props.props.handleNewXY){
          this.props.props.handleNewXY(feature.properties.label_x, feature.properties.label_y)
          this.props.props.handleLayerId(layerId, feature.properties.admin)
        }
      },
    });
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

  add = (id, color, ID, Statistic) => {
    const layer=this.props.geojsonLayer.getLayer(id)
    layer.setStyle({
      fillColor: color,
      fillOpacity: 0.2,
      weight: 1,
    });
    layer.bindPopup('ID: ' + ID + '<br>Statistic: ' + Statistic);
    this.setState((prevState) => {
      return {paintedLayers: {
        ...prevState.paintedLayers,
        [L.stamp(layer)]: true,
      }};
    });
  }

  delete = (id) => {
    const layer=this.props.geojsonLayer.getLayer(id)
    layer.setStyle({
      fillColor: "",
      fillOpacity: 0,
    });
    layer.unbindPopup();
    this.setState((prevState) => {
      return {paintedLayers: { 
        ...prevState.paintedLayers,
        [L.stamp(layer)]: false,
      }};
    });
  }

  addByLatlng = (y, x, color, ID, Statistic) => {
    this.props.geojsonLayer.eachLayer((layer) => {
      if(layer.feature){
        if(layer.feature.properties.label_y === y && layer.feature.properties.label_x === x){
          layer.setStyle({
            fillColor: color,
            fillOpacity: 0.2,
            weight: 1,
          });
          layer.bindPopup('ID: ' + ID + '<br>Statistic: ' + Statistic);
          this.setState((prevState) => {
            return {paintedLayers: {
              ...prevState.paintedLayers,
              [L.stamp(layer)]: true,
            }};
          });
        }
      }
    });
  }

  deleteByLatlng = (y, x) => {
    this.props.geojsonLayer.eachLayer((layer) => {
      if(layer.feature){
        if(layer.feature.properties.label_y === y && layer.feature.properties.label_x === x){
          layer.setStyle({
            fillColor: "",
            fillOpacity: 0,
          });
          layer.unbindPopup();
          this.setState((prevState) => {
            return {paintedLayers: { 
              ...prevState.paintedLayers,
              [L.stamp(layer)]: false,
            }};
          });
        }
      }
    });
  }

  undo = (customization) => {
    if(customization.type == 'add'){
      this.deleteByLatlng(customization.value.y, customization.value.x)
    }
    else if(customization.type == 'delete'){
      this.addByLatlng(customization.value.y, customization.value.x, customization.value.color, customization.value.value, customization.value.string)
    }
  }

  redo = (customization) => {
    if(customization.type == 'add'){
      this.addByLatlng(customization.value.y, customization.value.x, customization.value.color, customization.value.value, customization.value.string)
    }
    else if(customization.type == 'delete'){
      this.deleteByLatlng(customization.value.y, customization.value.x)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.props.mapData !== this.props.props.mapData || prevProps.mapType !== this.props.mapType) {
      this.loadFile(this.props.props.mapData);
    }
    if (prevProps.props.customization !== this.props.props.customization){
      if(this.props.props.customization.redoUndo == 'redo'){
        this.redo(this.props.props.customization.custom)
      }
      else if(this.props.props.customization.redoUndo == 'undo'){
        this.undo(this.props.props.customization.custom)
      }
      else if(this.props.props.customization.redoUndo == 'add'){
        this.addByLatlng(this.props.props.customization.custom.y, this.props.props.customization.custom.x, this.props.props.customization.custom.color, this.props.props.customization.custom.value, this.props.props.customization.custom.string)
      }
      else if(this.props.props.customization.redoUndo == 'delete'){
        this.deleteByLatlng(this.props.props.customization.custom.y, this.props.props.customization.custom.x)
      }
    }
  }

  render() {
    return null
  }
}

export default ChoroplethMap;
