import "./App.css";
import Categories from "./components/Categories/Categories";
import Register from "./components/register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
}

export default App;
