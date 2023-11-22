import React, { Component } from "react";
import L, { marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Discuss.css";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      geojsonLayer: null, // Store the GeoJSON layer
      selectedLayer: null,
      changedText: "",
      changedFont: "",
      selectedColor: "#ffffff", // default: white
      paintedLayers: {},
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

      L.marker([40.915734, 286.87721]).addTo(map);

      // Set the map object in the component state
      this.setState({ map });

      // Mark the map as initialized
      this.mapInitialized = true;
    }
  }

  loadFile = (geojson) => {
    this.clearmap();
    this.setState({ geojsonLayer: geojson });
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
        weight: 2,
        color: "#3388ff",
        fillColor: "#3388ff",
        fillOpacity: 0.2,
      });
    }
  };

  handleSelectColor = (event) => {
    this.setState({ selectedColor: event.target.value });
  };
  //-------------------onEachFeature --------------------
  onEachFeature = (feature, layer) => {
    if (feature.properties.admin != null) {
      const label = L.divIcon({
        className: "label",
        html: `<div>${feature.properties.admin}</div>`,
      });
      // Create a marker with the label and add it to the map
      var marker = L.marker(layer.getBounds().getCenter(), {
        icon: label,
      });

      // Add the marker to the map
      // marker.addTo(this.state.map);
      this.state.map.addLayer(marker);

    }
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: (e) => {
        const currentLayer = e.target;
        const layerId = L.stamp(currentLayer); // Unique ID for each polygon
        if (this.state.paintedLayers[layerId]) {
          // Remove color if already painted polygon is clicked
          currentLayer.setStyle({
            fillColor: "", // remove Fill color
            fillOpacity: 0, // Fill opacity 0
          });
          this.setState((prevState) => {
            const newPaintedLayers = { ...prevState.paintedLayers };
            delete newPaintedLayers[layerId];
            return { paintedLayers: newPaintedLayers };
          });
        } else {
          // If you click on a new polygon, apply the selected color
          currentLayer.setStyle({
            fillColor: this.props.selectedColor,
            fillOpacity: 0.3,
            weight: 1,
          });
          this.setState((prevState) => ({
            paintedLayers: {
              ...prevState.paintedLayers,
              [layerId]: this.props.selectedColor,
            },
          }));
        }

        this.updateLabel(currentLayer, marker, feature, this.props.changedText);
      },
    });
  };

  updateLabel = (layer, marker, feature, text) => {
    if (text) {
      
      if (feature.properties.admin != null) {
        // this.state.map.removeLayer(marker);
        const label = L.divIcon({
          className: "label",
          html: `<div style="color: black;">${text}</div>`,
        });
        // const marker = L.marker(layer.getBounds().getCenter(), {
        //   icon: label,
        // });
        marker.setIcon(label);
        // marker.addTo(this.state.map);
      }
      feature.properties.admin = text;
    }
  };

  renderMap = () => {
    const { map, geojsonLayer } = this.state;
    if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
      const layer = L.geoJSON(geojsonLayer, {
        onEachFeature: this.onEachFeature,
      });
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      this.setState({ geojsonLayer: layer });
    }
  };

  // csrenderMap = () => {
  //   // Changed
  //   const { map, geojsonLayer } = this.state;
  //   if (map && geojsonLayer && geojsonLayer.type === "FeatureCollection") {
  //     const layer = L.geoJSON(geojsonLayer, {
  //       onEachFeature: (feature, layer) => {
  //         // Access feature properties and create a label
  //         if (feature.properties.admin != null) {
  //           const label = L.divIcon({
  //             className: "label",
  //             html: `<div>${feature.properties.admin}</div>`,
  //           });

  //           // Create a marker with the label and add it to the map
  //           const marker = L.marker(layer.getBounds().getCenter(), {
  //             icon: label,
  //           });

  //           // Add the marker to the map
  //           marker.addTo(this.state.map);
  //         }
  //       },
  //     });
  //     // Add the new GeoJSON layer to the map
  //     layer.addTo(map);

  //     // Fit the map bounds to the GeoJSON layer
  //     map.fitBounds(layer.getBounds());
  //     this.setState({ geojsonLayer: layer });
  //   }
  // };

  updateAllLabels = () => {
    const { map, geojsonLayer } = this.state;
    if (map && geojsonLayer) {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      geojsonLayer.eachLayer((layer) => {
        const feature = layer.feature;
        if (feature && feature.properties.admin !== this.props.changedText) {
          const label = L.divIcon({
            className: "label",
            html: `<div style="font-family: ${this.props.changedFont};">${feature.properties.admin}</div>`,
          });
          const newMarker = L.marker(layer.getBounds().getCenter(), {
            icon: label,
          });
          console.log("Adding new marker:", newMarker);
          newMarker.addTo(map);
        }
        if (feature && feature.properties.admin === this.props.changedText) {
          const label = L.divIcon({
            className: "label",
            html: `<div style="font-family: ${this.props.changedFont};">${this.props.changedText}</div>`,
          });
          const newMarker = L.marker(layer.getBounds().getCenter(), {
            icon: label,
          });
          console.log("Adding new marker:", newMarker);
          newMarker.addTo(map);
        }
      });
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
    if (prevProps.changedFont !== this.props.changedFont) {
      this.updateAllLabels();
    }
  }

  render() {
    const { style, width, height } = this.props;
    const mapStyle = style || {
      height: height || "500px",
      width: width || "1050px",
    };
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