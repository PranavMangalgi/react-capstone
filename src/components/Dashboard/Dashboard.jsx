import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.module.css'
function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("in db");
    console.log(localStorage.getItem("authenticated")); //true
    if (!localStorage.getItem("authenticated")) {
      //false

      navigate("/register");
    }
  },[]);

  return <div>Dashboard</div>;
}

export default Dashboard;
