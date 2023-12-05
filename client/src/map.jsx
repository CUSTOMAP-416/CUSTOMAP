import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Discuss.css";
import "./styles/MapView.css";
import 'leaflet-easyprint';
import DefaultMap from "./mapTypes/default.jsx";
import HeatMap from "./mapTypes/heat.jsx";
import PointMap from "./mapTypes/point.jsx";
import RouteMap from "./mapTypes/route.jsx";
import BubbleMap from "./mapTypes/bubble.jsx";
import ThematicMap from "./mapTypes/thematic.jsx";
import ChoroplethMap from "./mapTypes/choropleth.jsx";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      geojsonLayer: null, // Store the GeoJSON layer
    };
    this.mapContainerRef = React.createRef();
    this.mapInitialized = false; // Track if the map has been initialized
  }

  componentDidMount() {
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

      map.on('click', function(e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        console.log('Clicked at:', lat, lng);
      });

      // Set the map object in the component state
      this.setState({ map });

      // Mark the map as initialized
      this.mapInitialized = true;
    }
  }

  setGeojsonLayer = (geojsonLayer) => {
    this.setState({ geojsonLayer: geojsonLayer })
  }

  manualPrint = () => {
    const { map } = this.state;
    var printer = L.easyPrint({
      filename: 'myMap',
      exportOnly: true,
      hideControlContainer: true,
      hidden: true,
    }).addTo(map);
    printer.printMap('CurrentSize', 'MyManualPrint');
  };

  manualPrintpdf = () => {
    const { map } = this.state;
    var printer = L.easyPrint({
      filename: 'myMap',
      hidden: true,
    }).addTo(map);
    printer.printMap('CurrentSize', 'MyManualPrint');
  };

  manualExportJson = () => {
    const { map, geojsonLayer } = this.state;
    if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
      const geojsonStr = JSON.stringify(geojsonLayer);
      const blob = new Blob([geojsonStr], { type: "application/json" });
      
      const url = URL.createObjectURL(blob);
  
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "mapData.json";

      downloadLink.click();
      
      URL.revokeObjectURL(url);
    }
  };

  exportMapToJson = (map, geojsonLayer) => {
    if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
     
      const geojsonStr = JSON.stringify(geojsonLayer);
  
      const blob = new Blob([geojsonStr], { type: "application/json" });
  
      const url = URL.createObjectURL(blob);
  
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "mapData.json";

      downloadLink.click();
      
      URL.revokeObjectURL(url);
    }
  };

  render() {
    if (document.getElementById("json-option")) {
      document.getElementById("png-option").addEventListener("click", this.manualPrint);
      document.getElementById("pdf-option").addEventListener("click", this.manualPrintpdf);
      document.getElementById("json-option").addEventListener("click", this.manualExportJson);
    }
    
    const { style, width, height } = this.props;
    const mapStyle = style || {
      height: height || "500px",
      width: width || "100%",
    };
    return (
      <div id="map-container">
        <div id="main-map" ref={this.mapContainerRef} style={mapStyle}></div>
        {this.props.mapType === '' && <DefaultMap map={this.state.map} geojsonLayer={this.state.geojsonLayer} setGeojsonLayer={this.setGeojsonLayer} props={this.props}/>}
        {this.props.mapType === 'heat' && <HeatMap map={this.state.map} geojsonLayer={this.state.geojsonLayer} setGeojsonLayer={this.setGeojsonLayer} props={this.props}/>}
        {this.props.mapType === 'point' && <PointMap map={this.state.map} geojsonLayer={this.state.geojsonLayer} setGeojsonLayer={this.setGeojsonLayer} props={this.props}/>}
        {this.props.mapType === 'route' && <RouteMap map={this.state.map} geojsonLayer={this.state.geojsonLayer} setGeojsonLayer={this.setGeojsonLayer} props={this.props}/>}
        {this.props.mapType === 'bubble' && <BubbleMap map={this.state.map} geojsonLayer={this.state.geojsonLayer} setGeojsonLayer={this.setGeojsonLayer} props={this.props}/>}
        {this.props.mapType === 'thematic' && <ThematicMap map={this.state.map} geojsonLayer={this.state.geojsonLayer} setGeojsonLayer={this.setGeojsonLayer} props={this.props}/>}
        {this.props.mapType === 'choropleth' && <ChoroplethMap map={this.state.map} geojsonLayer={this.state.geojsonLayer} setGeojsonLayer={this.setGeojsonLayer} props={this.props}/>}
      </div>
    );
  }
}

export default MapComponent;
