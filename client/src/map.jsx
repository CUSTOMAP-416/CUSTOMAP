import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Discuss.css";

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
      const map = L.map(this.mapContainerRef.current).setView([40.915734,286.87721],13)
      map.removeControl(map.zoomControl);
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

  loadFile = (geojson) => {
    this.clearmap()
    this.setState({ geojsonLayer: geojson });
    setTimeout(() => {this.renderMap()}, 100);
  };

  renderMap = () => {
    // Changed
    const { map, geojsonLayer } = this.state;
    if (map && geojsonLayer && geojsonLayer.type == 'FeatureCollection') {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mapData !== this.props.mapData) {
      this.loadFile(this.props.mapData);
    }
  }


  render() {
    const { style, width, height } = this.props;
    const mapStyle = style || { height: height || "500px", width: width || "1050px" };
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