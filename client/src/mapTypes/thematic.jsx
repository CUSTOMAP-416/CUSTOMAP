import { Component, React } from "react";
import L from "leaflet";

class ThematicMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legendControl: null,
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
        let index = ''
        for(let j=7; j>0; j--){
          if(this.props.props.legendItems[j].visibility){
            if(parseFloat(this.props.props.layerItems[i].number) > parseFloat(this.props.props.legendItems[j].value)){
              index=j
              break;
            }
          }
        }
        if(index === ''){
          for(let j=0; j<8; j++){
            if(this.props.props.legendItems[j].visibility){
              index = j
              break;
            }
          }
        }
        layer.setStyle({
          fillColor: this.props.props.legendItems[index].color,
          color: 'white',
          fillOpacity: this.props.props.legendItems[index].opacity,
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

  updateLegend = () => {
    const { legendControl } = this.state;
    if (legendControl) {
        legendControl.update();
    }
    if(this.props.geojsonLayer.eachLayer){
      for(let i=0; i<this.props.props.layerItems.length; i++){
        let index = ''
        for(let j=7; j>0; j--){
          if(this.props.props.legendItems[j].visibility){
            if(parseFloat(this.props.props.layerItems[i].number) > parseFloat(this.props.props.legendItems[j].value)){
              index=j
              break;
            }
          }
        }
        if(index === ''){
          for(let j=0; j<8; j++){
            if(this.props.props.legendItems[j].visibility){
              index = j
              break;
            }
          }
        }
        this.props.geojsonLayer.eachLayer((layer) => {
          if(layer.feature){
            if(layer.feature.properties.label_y === this.props.props.layerItems[i].y && layer.feature.properties.label_x === this.props.props.layerItems[i].x){
              layer.setStyle({
                fillColor: this.props.props.legendItems[index].color,
                color: 'white',
                fillOpacity: this.props.props.legendItems[index].opacity,
                weight: 1,
              });
            }
          }
        });
      }
    }
  };

  hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }; 

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
      if(this.props.props.legendItems.length !== 0){
        if (!this.state.legendControl) {
          const liVisibility = this.state.liVisibility
          const legendItems = this.props.props.legendItems
          const hexToRGBA = this.hexToRGBA
          const legendControl = L.Layer.extend({
              onAdd: function (leafletMap) {
                  this._container = L.DomUtil.create('div', 'legend');
                  this._container.style.position = 'absolute';
                  this._container.style.bottom = '20px';
                  this._container.style.right = '10px';
                  this._container.style.maxWidth = '150px';
                  this._container.style.zIndex = 1000;
                  this.update();
                  leafletMap.getContainer().appendChild(this._container);
              },
              onRemove: function (leafletMap) {
                  leafletMap.getContainer().removeChild(this._container);
              },
              update: function () {
                this._container.innerHTML = ''
                if(legendItems[0].visibility){
                  let value='inf'
                  for(let i=1; i<8; i++){
                    if(legendItems[i].visibility){
                      value = legendItems[i].value
                      break
                    }
                  }
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[0].color, legendItems[0].opacity)}">< ${value}</li>`
                }
                if(legendItems[1].visibility){
                  let value='inf'
                  for(let i=2; i<8; i++){
                    if(legendItems[i].visibility){
                      value = legendItems[i].value
                      break
                    }
                  }
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[1].color, legendItems[1].opacity)}">${legendItems[1].value} - ${value}</li>`
                }
                if(legendItems[2].visibility){
                  let value='inf'
                  for(let i=3; i<8; i++){
                    if(legendItems[i].visibility){
                      value = legendItems[i].value
                      break
                    }
                  }
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[2].color, legendItems[2].opacity)}">${legendItems[2].value} - ${value}</li>`
                }
                if(legendItems[3].visibility){
                  let value='inf'
                  for(let i=4; i<8; i++){
                    if(legendItems[i].visibility){
                      value = legendItems[i].value
                      break
                    }
                  }
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[3].color, legendItems[3].opacity)}">${legendItems[3].value} - ${value}</li>`
                }
                if(legendItems[4].visibility){
                  let value='inf'
                  for(let i=5; i<8; i++){
                    if(legendItems[i].visibility){
                      value = legendItems[i].value
                      break
                    }
                  }
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[4].color, legendItems[4].opacity)}">${legendItems[4].value} - ${value}</li>`
                }
                if(legendItems[5].visibility){
                  let value='inf'
                  for(let i=6; i<8; i++){
                    if(legendItems[i].visibility){
                      value = legendItems[i].value
                      break
                    }
                  }
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[5].color, legendItems[5].opacity)}">${legendItems[5].value} - ${value}</li>`
                }
                if(legendItems[6].visibility){
                  let value='inf'
                  if(legendItems[7].visibility){
                    value = legendItems[7].value
                  }
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[6].color, legendItems[6].opacity)}">${legendItems[6].value} - ${value}</li>`
                }
                if(legendItems[7].visibility){
                  this._container.innerHTML +=
                  `<li style="background: ${hexToRGBA(legendItems[7].color, legendItems[7].opacity)}">> ${legendItems[7].value}</li>`;
                }
              }
          });
          var legend = new legendControl();
          this.setState({ legendControl: legend});
          legend.addTo(map);
        } else {
            this.updateLegend();
        }
      }
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

  add = (id, value) => {
    const layer=this.props.geojsonLayer.getLayer(id)
    let index = ''
    for(let j=7; j>0; j--){
      if(this.props.props.legendItems[j].visibility){
        if(parseFloat(value) > parseFloat(this.props.props.legendItems[j].value)){
          index=j
          break;
        }
      }
    }
    if(index === ''){
      for(let j=0; j<8; j++){
        if(this.props.props.legendItems[j].visibility){
          index = j
          break;
        }
      }
    }
    layer.setStyle({
      fillColor: this.props.props.legendItems[index].color,
      color: 'white',
      fillOpacity: this.props.props.legendItems[index].opacity,
      weight: 1,
    });
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
    this.setState((prevState) => {
      return {paintedLayers: { 
        ...prevState.paintedLayers,
        [L.stamp(layer)]: false,
      }};
    });
  }

  addByLatlng = (y, x, value) => {
    this.props.geojsonLayer.eachLayer((layer) => {
      if(layer.feature){
        if(layer.feature.properties.label_y === y && layer.feature.properties.label_x === x){
          let index = ''
          for(let j=7; j>0; j--){
            if(this.props.props.legendItems[j].visibility){
              if(parseFloat(value) > parseFloat(this.props.props.legendItems[j].value)){
                index=j
                break;
              }
            }
          }
          if(index === ''){
            for(let j=0; j<8; j++){
              if(this.props.props.legendItems[j].visibility){
                index = j
                break;
              }
            }
          }
          layer.setStyle({
            fillColor: this.props.props.legendItems[index].color,
            color: 'white',
            fillOpacity: this.props.props.legendItems[index].opacity,
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
      this.addByLatlng(customization.value.y, customization.value.x, customization.value.number)
    }
  }

  redo = (customization) => {
    if(customization.type == 'add'){
      this.addByLatlng(customization.value.y, customization.value.x, customization.value.number)
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
      else if(this.props.props.customization.redoUndo == 'legend'){
        this.updateLegend()
      }
      else if(this.props.props.customization.redoUndo == 'add'){
        this.addByLatlng(this.props.props.customization.custom.y, this.props.props.customization.custom.x, this.props.props.customization.custom.number)
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

export default ThematicMap;
