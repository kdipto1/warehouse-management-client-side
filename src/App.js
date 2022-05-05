import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Pages/Home/Header";
import Home from "./Pages/Home/Home";
import ManageItem from "./Pages/ManageItem/ManageItem";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/inventory/:id" element={<ManageItem/>}>Manage Item</Route>
      </Routes>
    </div>
  );
}

export default App;
