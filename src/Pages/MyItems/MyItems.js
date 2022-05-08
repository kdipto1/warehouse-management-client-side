import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import "./MyItems.css";

const MyItems = () => {
  const [user, loading, error] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    const getMyItems = async () => {
      const email = user?.email;
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
        console.log(error);
        if (error.response.status === 403) {
          toast(error.response.data.message);
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getMyItems();
  }, [user, newItems, navigate, loading]);
  const deleteItem = async (id) => {
    const agree = window.confirm("Delete");
    if (!agree) {
      return;
    } else {
      const url = `https://server-11-11.herokuapp.com/inventory/${id}`;
      console.log(id);
      try {
        await axios.delete(url, { id }).then((response) => {
          const { data } = response;
          if (data) {
            console.log(data);
            setNewItems(data);
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
