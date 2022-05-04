import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Pages/Home/Header";
import Home from "./Pages/Home/Home";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/inventory/:id" element={<ManageInventory></ManageInventory>}>Manage Inventory</Route>
      </Routes>
    </div>
  );
}

export default App;
