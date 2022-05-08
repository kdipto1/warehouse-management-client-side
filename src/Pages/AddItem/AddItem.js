import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AddItem = () => {
  const [user, loading, error] = useAuthState(auth);
  localStorage.setItem("email", `${user?.email}`);
  const addNewItem = (event) => {
    event.preventDefault();
    // const email = event?.target?.email?.value;
    const email = localStorage.getItem("email");
    const name = event?.target?.name?.value;
    const supplier = event?.target?.supplier?.value;
    const price = event?.target?.price?.value;
    const quantity = event?.target?.quantity?.value;
    const description = event?.target?.description?.value;
    const image = event?.target?.image?.value;
    const item = {
      email: email,
      name: name,
      supplier: supplier,
      price: price,
      quantity: quantity,
      description: description,
      image: image,
    };
    console.log(item);
    const url = `https://server-11-11.herokuapp.com/inventory/`;
    axios
      .post(url, {
        email: email,
        name: name,
        supplier: supplier,
        price: price,
        quantity: quantity,
        description: description,
        image: image,
      })
      .then(function (response) {
        const { data } = response;
        console.log(data);
        if (data) {
          toast("Product Successfully Added");
        }
        event.target.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container vh-100 text-center">
      <div className=" mx-auto">
        <h2>Add New Item:</h2>
        <form onSubmit={addNewItem}>
          {/* <input
            className="form-control w-50 mb-1"
            type="email"
            value={user?.email}
            disabled
            name="email"
            id=""
          /> */}
          <br />
          <input
            className="w-50  mb-1"
            type="text"
            name="name"
            id=""
            placeholder="product name"
            required
          />
          <br />
          <input
            className=" w-50 mb-1"
            type="text"
            name="supplier"
            id=""
            placeholder="product supplier"
            required
          />
          <br />
          <input
            className=" w-50 mb-1"
            type="text"
            name="image"
            id=""
            placeholder="image link"
          />
          <br />
          <input
            className="w-50 mb-1"
            type="number"
            name="price"
            id=""
            placeholder="price of products"
            required
          />
          <br />
          <input
            className="w-50 mb-1"
            type="number"
            name="quantity"
            id=""
            placeholder="product quantity"
            required
          />
          <br />
          <textarea
            className="w-50"
            name="description"
            id=""
            cols="40"
            rows="6"
            placeholder="product description"
          ></textarea>
          <br />
          <input className="home-button" type="submit" value="Add Item" />
        </form>
      </div>
    </div>
  );
};

export default AddItem;
