import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ManageItem.css";

const ManageItem = () => {
  const params = useParams();
  let [item, setItem] = useState({});
  let [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const getItem = async () => {
      const url = `http://localhost:5000/inventory/${params.id}`;
      try {
        const { data } = await axios.get(url);
        setItem(data);
        // setQuantity(data.quantity);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [params.id, quantity]);

  const handleDelivery = (event) => {
    event.preventDefault();
    let quantity = parseInt(item.quantity) - 1;
    console.log(quantity);
    // setQuantity(newQuantity);
    // const { itemQuantity } = newQuantity;
    const url = `http://localhost:5000/inventory/${params.id}`;
    try {
      axios.put(url, { quantity: quantity }).then((response) => {
        const { data } = response;
        if (data) {
          console.log(data);
          // alert("quantity updated");
          setQuantity(quantity);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRestock = (event) => {
    event.preventDefault();
    let quantity =
      parseInt(item.quantity) + parseInt(event.target.quantity.value);
    console.log(quantity);
    const url = `http://localhost:5000/inventory/${params.id}`;
    if (parseInt(event.target.quantity.value) >= 0) {
      try {
        axios.put(url, { quantity: quantity }).then((response) => {
          const { data } = response;
          if (data) {
            console.log(data);
            setQuantity(quantity);
            event.target.reset();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>Manage Item:{item.name}</h2>
      <h4>Quantity:{item.quantity}</h4>
      <div className="w-50 mx-auto">
        <h4>{item.name}</h4>
        <img
          loading="lazy"
          style={{ width: "300px" }}
          src={item.image}
          alt=""
        />
        <p>{item.description}</p>
        <h6>Price: ${item.price}</h6>
        <h6>Quantity: {item.quantity}</h6>
        <h6>Supplier:{item.supplier}</h6>
      </div>
      <div className="loginBox">
        <form onSubmit={handleRestock}>
          <input
            type="number"
            // onChange={handleQuantityChange}
            placeholder="update stock"
            name="quantity"
            id=""
          />
          <input type="submit" value="Update Stock" />
        </form>
        <button onClick={handleDelivery}>Delivered</button>
      </div>
    </div>
  );
};

export default ManageItem;
