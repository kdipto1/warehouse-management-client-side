import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "leaflet/dist/leaflet.css";
import banner from "../Images/banner.png";
import CountUp from "react-countup";
import Skeleton from "react-loading-skeleton";
import Contact from "./Contact";

const Home = () => {
  const [items, setItems] = useState([]);
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
    <div className="home">
      <div>
        <img className="img-fluid" src={banner} alt="" />
      </div>
      {/* Inventory item section home page --------------------------*/}
      <h2 className="text-center mt-5">Items:</h2>
      <div className="home-cards container mb-2">
        {items.map((item) => {
          <h1>{item.name || <Skeleton count={100} />}</h1>;
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
      <hr />

      <div className="text-center mt-4">
        <h2>
          We proudly provided services to <CountUp duration={4} end={4860} />{" "}
          Customers
        </h2>
      </div>
      <div className="text-center mt-4">
        <h4>To see our location on map, Click the button below!</h4>
        <Link to="/map">
          <button className="home-button">Map</button>{" "}
        </Link>
      </div>
      <Contact></Contact>
    </div>
  );
};

export default Home;
