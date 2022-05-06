import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"

const Home = () => {
  const position = [23.79377280479345, 90.40535937216653];
  const center = [23.79377280479345, 90.40535937216653];
  const [items, setItems] = useState([]);
  const markerIcon = new L.Icon({
    iconUrl: require("../Icons/pointer.png"),
    iconSize: [50,100]
  })
  // console.log(items);
  useEffect(() => {
    const getItems = async () => {
      const url = `http://localhost:5000/inventory?size=6`;
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
      <h2>home</h2>
      <div>
        <h2>Banner</h2>
      </div>
      {/* Inventory item section home page */}
      <div className="home-cards container">
        {items.map((item) => {
          return (
            <div data-aos="flip-up" key={item._id} className="home-card">
              <h4>{item.name}</h4>
              <img
                loading="lazy"
                style={{ width: "300px" }}
                src={item.image}
                alt=""
              />
              <p>{item.description.slice(0, 100)}...</p>
              <h6>Price: ${item.price}</h6>
              <h6>Quantity:  {item.quantity} </h6>
              <h6>Supplier:{item.supplier}</h6>
              <Link to={`/inventory/${item._id}`}>
                <button>Details</button>
              </Link>
            </div>
          );
        })}
      </div>
      {/* mapppppppppppppppp */}
      <div className="mt-5">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "50vw", height: "50vh" }}
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
