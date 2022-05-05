import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Items = () => {
  const [items, setItems] = useState([]);
  const[newItems, setNewItems] = useState([])
  console.log(items);
  useEffect(() => {
    const getItems = async () => {
      const url = `http://localhost:5000/inventory`;
      try {
        const { data } = await axios.get(url);
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, [newItems]);
  const deleteItem = async (id) => {
    console.log(id);
    const url = `http://localhost:5000/inventory/${id}`;
    try {
      await axios.delete(url, { id }).then((response) => {
        const { data } = response;
        if (data) {
          console.log(data);
          setNewItems(data)
          // setItems()
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>All item:{items?.length}</h2>
      <Table striped bordered hover responsive>
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
        {items?.map(item => {
          return (
            <tbody key={item?._id}>
              <tr>
                <td>{item?._id}</td>
                <td>{item?.name}</td>
                <td>{item?.quantity}</td>
                <td>{item?.supplier}</td>
                <td> <img loading="lazy" style={{ width:"50px" ,aspectRatio: "16/9"}} src={item?.image} alt="" /> </td>
                <td>
                  <Link to={`/inventory/${item?._id}`}>
                    <button>Details</button>
                  </Link> {" "}
                  <button onClick={()=>deleteItem(item?._id)}>Delete</button>
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