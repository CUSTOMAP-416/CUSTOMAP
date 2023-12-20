import { Component } from "react";
import L from "leaflet";
import 'leaflet.heat';

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heatLayer: null,
      heatData: [],
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
        fillColor: this.props.props.selectedColor,
        color: "#808080",
        weight: 1,
        fillOpacity: 0.1,
      });
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      this.props.setGeojsonLayer(layer)
    }

    const heatLayer =L.heatLayer([]).addTo(map);
    this.setState({heatLayer: heatLayer})
    setTimeout(() => {
      for(let i=0; i<this.props.props.layerItems.length; i++){
        this.add(this.props.props.layerItems[i].y, this.props.props.layerItems[i].x, this.props.props.layerItems[i].number)
      }
    }, 100);
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

  add = (lat, lng, number) => {
    //add marker
    const marker = L.marker([lat, lng], {  
      opacity: 0,
      icon: L.divIcon({
            iconSize: [50, 50],
            iconAnchor: [25, 25],
            })},
    ).addTo(this.props.map);
    marker.on('click', (e) => {
      this.props.changeView(lat, lng)
    });
    //add heatLayer
    let heatData = this.state.heatData;
    heatData.push([lat, lng, number])
    const heatLayer = this.state.heatLayer
    heatLayer.setLatLngs(heatData)
    this.setState({
      heatLayer: heatLayer,
      heatData: heatData,
    })
  }
  delete = (lat, lng) => {
    const map = this.props.map
    //delete marker
    map.eachLayer(function(layer){
      if(layer._latlng){
        if(layer._latlng.lat === lat && layer._latlng.lng === lng){
          map.removeLayer(layer)
        }
      }
    });
    //delete heat
    let heatData = this.state.heatData;
    heatData.forEach((point, index) => {
        if (point[0] === lat && point[1] === lng) {
          heatData.splice(index, 1);
        }
    });
    const heatLayer = this.state.heatLayer
    heatLayer.setLatLngs(heatData)
    this.setState({
      heatLayer: heatLayer,
      heatData: heatData,
    })
  }

  undo = (customization) => {
    if(customization.type === 'add'){
      this.delete(customization.value.y, customization.value.x)
    }
    else if(customization.type === 'delete'){
      this.add(customization.value.y, customization.value.x, customization.value.number)
    }
    else if(customization.type === 'background'){
      const geojsonLayer = this.props.geojsonLayer;
      geojsonLayer.setStyle({
        fillColor: customization.previous,
        color: "#808080",
        weight: 1,
        fillOpacity: 0.1,
      });
    }
  }

  redo = (customization) => {
    if(customization.type === 'add'){
      this.add(customization.value.y, customization.value.x, customization.value.number)
    }
    else if(customization.type === 'delete'){
      this.delete(customization.value.y, customization.value.x)
    }
    else if(customization.type === 'background'){
      const geojsonLayer = this.props.geojsonLayer;
      geojsonLayer.setStyle({
        fillColor: customization.value.background,
        color: "#808080",
        weight: 1,
        fillOpacity: 0.1,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.props.mapData !== this.props.props.mapData || prevProps.mapType !== this.props.mapType) {
      this.loadFile(this.props.props.mapData);
    }
    if (prevProps.props.customization !== this.props.props.customization){
      if(this.props.props.customization.redoUndo === 'redo'){
        this.redo(this.props.props.customization.custom)
      }
      else if(this.props.props.customization.redoUndo === 'undo'){
        this.undo(this.props.props.customization.custom)
      }
      else if(this.props.props.customization.redoUndo === 'add'){
        this.add(this.props.props.customization.custom.y, this.props.props.customization.custom.x, this.props.props.customization.custom.number)
      }
      else if(this.props.props.customization.redoUndo === 'delete'){
        this.delete(this.props.props.customization.custom.y, this.props.props.customization.custom.x)
      }
    } 
    if(prevProps.props.selectedColor !== this.props.props.selectedColor){
      const geojsonLayer = this.props.geojsonLayer;
      if(geojsonLayer){
        if(geojsonLayer.getLayers){
          if(this.props.props.handleCustomization){
            const state = {
              type: 'background',
              previous: geojsonLayer.getLayers()[0].options.fillColor,
              value: {
                background: this.props.props.selectedColor,
              }
            }
            this.props.props.handleCustomization(state)
          }
          geojsonLayer.setStyle({
            fillColor: this.props.props.selectedColor,
            color: "#808080",
            weight: 1,
            fillOpacity: 0.1,
          });
        }
      }
    }
  }


  render() {
    return null
  }
}

export default HeatMap;
