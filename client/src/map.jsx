import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
//import shp from "shpjs"; // For handling Shapefiles
import toGeoJSON from "@mapbox/togeojson"; // Updated import for toGeoJSON
//import "./style.css";
import * as shapefile from "shapefile";
import JSZip from 'jszip';

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
      const map = L.map(this.mapContainerRef.current).setView([40.915734, 286.87721], 13);

      // Add a tile layer (you can choose a suitable one)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([40.915734, 286.87721]).addTo(map);

      // Set the map object in the component state
      this.setState({ map });

      // Mark the map as initialized
      this.mapInitialized = true;
    }
  }

  loadFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.name.endsWith(".zip")) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          try {
          const zip = await JSZip.loadAsync(e.target.result);

          const shpFile = zip.file(/\.shp$/i)[0];
          const dbfFile = zip.file(/\.dbf$/i)[0];

          // Read the content of each component as ArrayBuffer
          const shpBuffer = await shpFile.async("arraybuffer");
          const dbfBuffer = await dbfFile.async("arraybuffer");

          const geojson = await shapefile.read(shpBuffer, dbfBuffer);

          this.setState({ geojsonLayer: geojson });
            
          } catch (error) {
            console.error("Error loading Shapefile:", error);
          }
        };

        // Read the .shp file as an ArrayBuffer
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith(".kml")) {
        // Handle KML using toGeoJSON
        const reader = new FileReader();
        reader.onload = (e) => {
          const kmlString = e.target.result;

          // Convert KML to GeoJSON using toGeoJSON
          const kmlDocument = new DOMParser().parseFromString(
            kmlString,
            "text/xml"
          );
          const geojson = toGeoJSON.kml(kmlDocument);

          // Store the GeoJSON layer in the state
          this.setState({geojsonLayer: geojson});
        };
        reader.readAsText(file);
      } else if (file.name.endsWith(".geojson")) {
        // Handle GeoJSON directly
        const reader = new FileReader();
        reader.onload = (e) => {
          const geojson = JSON.parse(e.target.result);

          // Store the GeoJSON layer in the state
          this.setState({geojsonLayer: geojson});
        };
        reader.readAsText(file);
      } else {
        console.error("Unsupported file format");
      }
    }
  };

  renderMap = () => {
    // Changed
    const { map, geojsonLayer } = this.state;

    if (map && geojsonLayer) {
      const layer = L.geoJSON(geojsonLayer, {
        onEachFeature: (feature, layer) => {
          // Access feature properties and create a label
          if(feature.properties.admin != null){
            const label = L.divIcon({
              className: "label",
              html: `<div>${feature.properties.admin}</div>`,
            });

            // Create a marker with the label and add it to the map
            const marker = L.marker(layer.getBounds().getCenter(), {
              icon: label,
            });

            // Add the marker to the map
            marker.addTo(this.state.map);
          }
        },
      });
      // Add the new GeoJSON layer to the map
      layer.addTo(map);

      // Fit the map bounds to the GeoJSON layer
      map.fitBounds(layer.getBounds());
      this.setState({geojsonLayer: layer});
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

  render() {
    return (
      <div>
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
        <div id="heading-banner">MAP</div>
        <div ref={this.mapContainerRef} style={{ height: "500px" }}></div>
        <div className="flex-container">
          <input
            type="file"
            accept=".zip,.kml,.geojson"
            onChange={this.loadFile}
            style={{ backgroundColorcolor: "#158f2a", border: "5px, #158f2a" }}
          />
          <button className="button-19" onClick={this.renderMap}>
            Render
          </button>
          <button className="button-19" onClick={this.clearmap}>
            clear map
          </button>
          <div id="buttom-banner">
            Group project by Green team <br />
            Team members: Juyeon Nam, Seolhee Yun, Shihao Wen, Weikang Yang
          </div>
        </div>
      </div>
    );
  }
}

export default MapComponent;
