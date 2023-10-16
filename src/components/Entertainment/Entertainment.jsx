import React, { useState, useEffect } from "react";
import styles from "./entertainment.module.css";
import animatedPerson from "../../assets/round-animated.png";
import { Link } from "react-router-dom";
import Genre from './subcomponents/Genre'
function Entertainment() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const retrievedGenres = JSON.parse(localStorage.getItem("selectedGenres"));
    const filteredGenres = retrievedGenres.map(i=>i.genre);
    setGenres(filteredGenres);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Super App</h1>
        <Link to="/dashboard">
          <div>
            <img src={animatedPerson} alt="" />
          </div>
        </Link>
      </div>
      <div className={styles.subTitle}>
        <h2>Entertainment according to your choice</h2>
      </div>
      <div className={styles.genres}>
        {genres.map((genre)=>
            <Genre key={genre} genre={genre}/>
        )}
      </div>
    </div>
  );
}

export default Entertainment;
