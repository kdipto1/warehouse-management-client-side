import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./ManageItem.css";
import { GrDeliver } from "react-icons/gr";

const ManageItem = () => {
  const params = useParams();
  let [item, setItem] = useState({});
  let [quantity, setQuantity] = useState(0);
  let [newQuantity, setNewQuantity] = useState();
  useEffect(() => {
    const getItem = async () => {
      const url = `https://server-11-11.herokuapp.com/inventory/${params.id}`;
      try {
        const { data } = await axios.get(url);
        setItem(data);
        // setQuantity(data.quantity);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [params.id, quantity, newQuantity]);

  const handleDelivery = (event) => {
    event.preventDefault();
    if (item.quantity <= 0) {
      toast("Product not available. Please Restock!");
      return;
    }
    let quantity = parseInt(item.quantity) - 1;
    console.log(quantity);
    // setQuantity(newQuantity);
    // const { itemQuantity } = newQuantity;
    const url = `https://server-11-11.herokuapp.com/inventory/${params.id}`;
    try {
      axios.put(url, { quantity: quantity }).then((response) => {
        const { data } = response;
        if (data) {
          console.log(data);
          // alert("quantity updated");
          toast("Product Delivered");
          setNewQuantity(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRestock = (event) => {
    event.preventDefault();
    if (!event.target.quantity.value) {
      toast("Please put the quantity");
    }
    let quantity =
      parseInt(item.quantity) + parseInt(event.target.quantity.value);
    console.log(quantity);
    const url = `https://server-11-11.herokuapp.com/inventory/${params.id}`;
    if (parseInt(event.target.quantity.value) >= 0) {
      try {
        axios.put(url, { quantity: quantity }).then((response) => {
          const { data } = response;
          if (data) {
            console.log(data);
            toast("Stock updated");
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
    <div style={{ overflowX: "hidden" }}>
      <div
        data-aos="fade-right"
        className="w-75 mx-auto mt-2 p-2 text-center manage-card"
      >
        <h2 className="text-center ">Manage Item: {item.name}</h2>
        <h4>Product Id: {item._id}</h4>
        <img
          className="img-fluid mx-auto"
          loading="lazy"
          style={{ width: "300px" }}
          src={item.image}
          alt=""
        />
        <p>{item.description}</p>
        <h6>Price: ${item.price}</h6>
        <h6>Quantity: {item.quantity > 0 ? item.quantity : "stock out"}</h6>
        <h6>Supplier:{item.supplier}</h6>
        <button
          className="d-block mx-auto manage-button"
          onClick={handleDelivery}
        >
          {" "}
          <GrDeliver className="me-1" />
          Deliver
        </button>
      </div>
      <div
        data-aos="fade-left"
        className="text-center manage-stock w-75 w-lg-50 p-4 mx-auto mt-4"
      >
        <h4>Update Stock Quantity for {item.name}</h4>
        <form onSubmit={handleRestock}>
          <input
            className=" w-50 d-block mx-auto"
            type="number"
            placeholder="update stock"
            name="quantity"
          />
          <br />
          <input
            className="d-block mx-auto manage-button"
            type="submit"
            value="Update Stock"
          />
        </form>
      </div>
      <Link to="/inventory">
        <button className="d-block mx-auto mt-2 home-button">
          Manage Inventories
        </button>
      </Link>
    </div>
  );
};

export default ManageItem;
