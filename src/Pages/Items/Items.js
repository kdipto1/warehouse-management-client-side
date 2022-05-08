import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import "./Item.css";
import { MdDelete } from "react-icons/md";

const Items = () => {
  const [user, loading, error] = useAuthState(auth);

  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      const url = `https://server-11-11.herokuapp.com/inventory`;
      try {
        const { data } = await axios.get(url);
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, [newItems, user, loading]);
  const deleteItem = async (id) => {
    const verify = window.confirm("Delete");
    if (!verify) {
      return;
    } else {
      const url = `https://server-11-11.herokuapp.com/inventory/${id}`;
      try {
        await axios.delete(url, { id }).then((response) => {
          const { data } = response;
          if (data) {
            toast("Item Deleted");
            setNewItems(data);
            // setItems()
          }
        });
      } catch (error) {
        console.log(error);
      }
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
                    <button className="button-60">Manage</button>
                  </Link>{" "}
                  <button
                    className="button-60"
                    onClick={() => deleteItem(item?._id)}
                  >
                    Delete <MdDelete/>
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

export default Items;
