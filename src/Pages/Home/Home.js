import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import "leaflet/dist/leaflet.css";

import banner from "../Images/banner.png";
import HomeMap from "./HomeMap";

const Home = () => {
  const [items, setItems] = useState([]);
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
      <div>
        <img className="img-fluid" src={banner} alt="" />
      </div>
      {/* Inventory item section home page --------------------------*/}
      <h2 className="text-center mt-5">Items:</h2>
      <div className="home-cards container mb-2">
        {items.map((item) => {
          return (
            <div data-aos="flip-up" key={item._id} className="home-card">
              <h4 className="text-center">{item.name}</h4>
              <img
                className="d-block mx-auto"
                loading="lazy"
                style={{ width: "280px" }}
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
                <button className="home-button text-center">Manage</button>
              </Link>
            </div>
          );
        })}
      </div>
      <Link to="/inventory">
        <button className="d-block mx-auto home-button">
          Manage Inventories
        </button>
      </Link>

      {/* map ------------------------------------------ */}
      <div>
        <h2>Our services:</h2>
      </div>
      <HomeMap></HomeMap>
      
    </div>
  );
};

export default Home;
