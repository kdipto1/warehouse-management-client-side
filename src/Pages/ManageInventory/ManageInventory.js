import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ManageInventory = () => {
  const params = useParams()
  console.log(params.id);
  const [item, setItem] = useState({});
  console.log(item);
  useEffect(() => {
    const getItem = async () => {
      const url = `http://localhost:5000/inventory/${params.id}`;
      try {
        const { data } = await axios.get(url);
        setItem(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [params.id]);
  return (
    <div>
      <h2>Manage Item:{item.name}</h2>

    </div>
  );
};

export default ManageInventory;