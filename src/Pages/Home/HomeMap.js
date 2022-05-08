import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const HomeMap = () => {
  const position = [23.79377280479345, 90.40535937216653];
  const center = [23.79377280479345, 90.40535937216653];
  
  const markerIcon = new L.Icon({
    iconUrl: require("../Icons/pointer.png"),
    iconSize: [100, 200],
  });
  return (
    <div>
      <div className="maps-container ">
        <div className="mt-5 d-flex map-container">
          <h2>Our location:</h2>
          <MapContainer
            className="mx-auto"
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            // style={{ height: "100%", minHeight: "100%" }}
            style={{ width: "350px", height: "350px" }}
          >
            <TileLayer
              url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=LFYgaLPkja6NSkakY5kC"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />
            <Marker icon={markerIcon} position={position}>
              <Popup>Programming Hero, Dhaka</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeMap;