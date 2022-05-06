import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddItem from "./Pages/AddItem/AddItem";
import Header from "./Pages/Home/Header";
import Home from "./Pages/Home/Home";
import Items from "./Pages/Items/Items";
import Login from "./Pages/Login/Login";
import ManageItem from "./Pages/ManageItem/ManageItem";
import Register from "./Pages/Login/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";
import MyItems from "./Pages/MyItems/MyItems";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          Home
        </Route>
        <Route path="/inventory/:id" element={<ManageItem />}>
          Manage Item
        </Route>
        <Route path="/inventory" element={<Items />}>
          Manage Items
        </Route>
        <Route
          path="/addItem"
          element={
            <RequireAuth>
              <AddItem></AddItem>
            </RequireAuth>
          }
        >
          Add Item
        </Route>
        <Route path="/login" element={<Login></Login>}>
          Login
        </Route>
        <Route path="/register" element={<Register />}>
          Login
        </Route>
        <Route path="/myItems" element={<MyItems/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
