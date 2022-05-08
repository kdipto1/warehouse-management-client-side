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
import Footer from "./Pages/Footer/Footer";
import NotFound from "./Pages/NotFound/NotFound";
import Blogs from "./Pages/Blogs/Blogs";
import HomeMap from "./Pages/Home/HomeMap";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          Home
        </Route>
        <Route
          path="/inventory/:id"
          element={
            <RequireAuth>
              <ManageItem />
            </RequireAuth>
          }
        >
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
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/login" element={<Login></Login>}>
          Login
        </Route>
        <Route path="/register" element={<Register />}>
          Login
        </Route>
        <Route path="/myItems" element={<MyItems />}></Route>
        <Route path="/map" element={<HomeMap />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
