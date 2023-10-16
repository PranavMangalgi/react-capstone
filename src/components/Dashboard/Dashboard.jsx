import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import Notes from "./subcomponents/Notes";
import ProfileWeather from "./subcomponents/ProfileWeather";
import NewsSection from "./subcomponents/NewsSection";
import Timer from './subcomponents/Timer'

function Dashboard() {
  const date = new Date();
  const day = date.getDate();
  const hour = date.getHours();
  const formattedDate = date
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      navigate("/register");
    }
  }, [navigate]);
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <ProfileWeather formattedDate={formattedDate} time={time} day={day} /> {/* Prop 'day' ensures a server request only once per day */}
        <Notes />
        <Timer/>
      </div>
      <NewsSection
        formattedDate={formattedDate}
        time={time} hour={hour}
      /> {/* Prop 'hour' ensures a server request only once per hour */}
    </div>
  );
}

export default Dashboard;
