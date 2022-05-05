import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  const [items, setItems] = useState([]);
  // console.log(items);
  useEffect(() => {
    const getItems = async () => {
      const url = `http://localhost:5000/inventory?size=6`;
      try {
        const {data} = await axios.get(url)
        setItems(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getItems();
  },[])
  return (
    <div>
      <h2>home</h2>
      <div><h2>Banner</h2></div>
      {/* Inventory item section home page */}
      <div className="home-cards container">
        {
          items.map(item => {
           return (
             <div key={item._id} className="home-card">
               <h4>{item.name}</h4>
               <img
                 loading="lazy"
                 style={{ width: "300px" }}
                 src={item.image}
                 alt=""
               />
               <p>{item.description.slice(0, 100)}...</p>
               <h6>Price: ${item.price}</h6>
               <h6>Quantity: {item.quantity}</h6>
               <h6>Supplier:{item.supplier}</h6>
               <Link to={`/inventory/${item._id}`}>
                 <button>Details</button>
               </Link>
             </div>
           );
          })
        }
      </div>
    </div>
  );
};

export default Home;