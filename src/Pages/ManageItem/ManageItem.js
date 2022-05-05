import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ManageInventory.module.css";

const ManageItem = () => {
  const params = useParams();
  // console.log(params.id);
  let [item, setItem] = useState({});
  // const{_id, name,image, description, price,quantity,supplier}= item
  let [quantity, setQuantity] = useState(0);
  // console.log(item);
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

  const handleQuantity = (event) => {
    event.preventDefault();
    let quantity = item.quantity - 1;
    console.log(quantity);
    // setQuantity(newQuantity);
    // const { itemQuantity } = newQuantity;
    const url = `http://localhost:5000/inventory/${params.id}`;
    try {
      axios.put(url, { quantity: quantity }).then((response) => {
        const { data } = response;
        console.log(data);
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
  const handleQuantityChange = (event) => {
    event.preventDefault();
    let quantity =
      parseInt(item.quantity) + parseInt(event.target.quantity.value);
    console.log(quantity);
    const url = `http://localhost:5000/inventory/${params.id}`;
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
  };

  return (
    <div>
      <h2>Manage Item:{item.name}</h2>
      <h4>Quantity:{item.quantity}</h4>
      <div></div>
      <div className="loginBox">
        <form onSubmit={handleQuantityChange}>
          <input
            type="number"
            // onChange={handleQuantityChange}
            placeholder="update quantity"
            name="quantity"
            id=""
          />
          <input type="submit" value="Update quantity" />
        </form>
        <button onClick={handleQuantity}>Delivered</button>
      </div>
    </div>
  );
};

export default ManageItem;
