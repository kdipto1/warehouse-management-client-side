import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import banner from "../Images/banner.png";

const Home = () => {
  const position = [23.79377280479345, 90.40535937216653];
  const center = [23.79377280479345, 90.40535937216653];
  const [items, setItems] = useState([]);
  const markerIcon = new L.Icon({
    iconUrl: require("../Icons/pointer.png"),
    iconSize: [100, 200],
  });
  // console.log(items);
  useEffect(() => {
    const getItems = async () => {
      const url = `https://server-11-11.herokuapp.com/inventory?size=6`;
      try {
        const { data } = await axios.get(url);
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);
  return (
    <div>
      <div>
        <img className="img-fluid" src={banner} alt="" />
      </div>
      {/* Inventory item section home page --------------------------*/}
      <div className="home-cards container mb-5">
        {items.map((item) => {
          return (
            <div data-aos="flip-up" key={item._id} className="home-card">
              <h4 className="text-center">{item.name}</h4>
              <img
                className="d-block mx-auto"
                loading="lazy"
                style={{ width: "300px" }}
                src={item.image}
                alt=""
              />
              <p>{item.description.slice(0, 90)}...</p>
              <h6>Price: ${item.price}</h6>
              <h6>
                Quantity: {item.quantity > 0 ? item.quantity : "stock out"}{" "}
              </h6>
              <h6>Supplier:{item.supplier}</h6>
              <Link to={`/inventory/${item._id}`}>
                <button className="home-button text-center">Details</button>
              </Link>
            </div>
          );
        })}
      </div>
      {/* map ------------------------------------------ */}
      <div className="mt-5">
        <MapContainer
          className="d-block mx-auto map-container"
          center={center}
          zoom={13}
          scrollWheelZoom={false}
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
  );
};

export default Home;
