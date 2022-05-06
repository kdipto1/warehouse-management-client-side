import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddItem from "./Pages/AddItem/AddItem";
import Header from "./Pages/Home/Header";
import Home from "./Pages/Home/Home";
import Items from "./Pages/Items/Items";
import Login from "./Pages/Login/Login";
import ManageItem from "./Pages/ManageItem/ManageItem";
import Register from "./Pages/Login/Register"

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}>Home</Route>
        <Route path="/inventory/:id" element={<ManageItem/>}>Manage Item</Route>
        <Route path="/inventory" element={<Items />}>Manage Items</Route>
        <Route path="/addItem" element={<AddItem></AddItem>}>Add Item</Route>
        <Route path="/login" element={<Login></Login>}>Login</Route>
        <Route path="/register" element={<Register/>}>Login</Route>
        
        
      </Routes>
    </div>
  );
}

export default App;
