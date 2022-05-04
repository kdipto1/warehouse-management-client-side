import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [items, setItems] = useState([]);
  console.log(items);
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
      <div>
        
      </div>
    </div>
  );
};

export default Home;