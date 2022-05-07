import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import "./MyItems.css";

const MyItems = () => {
  const [user] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  useEffect(() => {
    const getMyItems = async () => {
      const email = user?.email;
      // console.log(email);
      const url = `https://server-11-11.herokuapp.com/inventoryUser?email=${email}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        });
        console.log(data);
        setItems(data);
      } catch (error) {
        console.log(error.response.data.message);
        toast(error.response.data.message);
      }
    };
    getMyItems();
  }, [user, newItems]);
  const deleteItem = async (id) => {
    console.log(id);
    const url = `https://server-11-11.herokuapp.com/inventory/${id}`;
    try {
      await axios.delete(url, { id }).then((response) => {
        const { data } = response;
        if (data) {
          console.log(data);
          setNewItems(data);
          // setItems()
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2 className="text-center">Manage Inventory</h2>
      <Link to="/addItem">
        <button className="d-block mx-auto button-39 mb-2">Add New Item</button>{" "}
      </Link>
      <Table data-aos="zoom-in" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Image</th>
            <th>Manage Item</th>
          </tr>
        </thead>
        {items?.map((item) => {
          return (
            <tbody key={item?._id}>
              <tr>
                <td>{item?._id}</td>
                <td>{item?.name}</td>
                <td>{item?.quantity}</td>
                <td>{item?.supplier}</td>
                <td>
                  {" "}
                  <img
                    loading="lazy"
                    style={{ width: "50px", aspectRatio: "16/9" }}
                    src={item?.image}
                    alt=""
                  />{" "}
                </td>
                <td>
                  <Link to={`/inventory/${item?._id}`}>
                    <button className="button-60">Details</button>
                  </Link>{" "}
                  <button
                    className="button-60"
                    onClick={() => deleteItem(item?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default MyItems;
