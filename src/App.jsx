import "./App.css";
import Categories from "./components/Cateogries/Categories";
import Register from "./components/register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
    </>
  );
}

export default App;
