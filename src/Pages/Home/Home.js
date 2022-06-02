import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "./Home.css";
import "leaflet/dist/leaflet.css";
import banner from "../Images/banner.png";
import CountUp from "react-countup";
import Contact from "./Contact";
import Loading from "../Utility/Loading";

const Home = () => {
  const { data: items, isLoading } = useQuery("homeItems", () =>
    fetch("https://server-11-11.herokuapp.com/inventory?size=6").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="home">
      <div>
        <img className="img-fluid" src={banner} alt="" />
      </div>
      {/* Inventory item section home page --------------------------*/}
      <h2 className="text-center mt-5">Items:</h2>
      <div className="home-cards container mb-2">
        {items.map((item) => {
          return (
            <div
              data-aos="flip-up"
              data-aos-delay="200"
              data-aos-duration="2000"
              data-aos-mirror="false"
              key={item._id}
              className="home-card"
            >
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
