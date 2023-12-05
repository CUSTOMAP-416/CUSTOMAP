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
        style: function (feature) {
          return { fillColor: getColor(100), weight: 1, opacity: 1, color: 'white', fillOpacity: 0.8 };
        }
      });
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      this.props.setGeojsonLayer(layer)

      function getColor(value) {
        return  value > 50 ? '#800026' :
                value > 40 ? '#BD0026' :
                value > 30 ? '#E31A1C' :
                value > 20 ? '#FC4E2A' :
                value > 10 ? '#dd9f40' :
                value > 0  ? '#FFEDA0' :
                             '#62a1db' ;
      }

      var legend = L.Layer.extend({
        onAdd: function (map) {
            this._container = L.DomUtil.create('div', 'legend');
            this._container.innerHTML = 
            '<li style="background: #FFFFFF"></li> undefined' +
            '<li style="background: #62a1db"></li> < 0' +
            '<li style="background: #FFEDA0"></li> 0 - 10' +
            '<li style="background: #dd9f40"></li> 10 - 20' +
            '<li style="background: #FC4E2A"></li> 20 - 30' +
            '<li style="background: #E31A1C"></li> 30 - 40' +
            '<li style="background: #BD0026"></li> 40 - 50' +
            '<li style="background: #800026"></li> > 50';
            this._container.style.position = 'absolute';
            this._container.style.bottom = '20px';
            this._container.style.right = '10px';
            this._container.style.maxWidth = '150px';
            this._container.style.zIndex = 1000; 
            map.getContainer().appendChild(this._container);
        },
        onRemove: function (map) {
            map.getContainer().removeChild(this._container);
        }
      });
    
      var legend = new legend();
      legend.addTo(map);
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
