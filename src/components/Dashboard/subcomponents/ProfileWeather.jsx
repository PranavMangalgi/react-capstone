import React, { useState, useEffect, useCallback } from "react";
import animatedImage from "../../../assets/animated-person.png";
import { WiDayRainMix, WiHumidity, WiDaySunnyOvercast } from "react-icons/wi";
import { TbWind } from "react-icons/tb";
import styles from "../dashboard.module.css";
import axios from "axios";
import key from "../../../API_KEY";

function ProfileWeather({ formattedDate, time, day }) {
  const [data, setData] = useState(null);

  
  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: {
          q: "12.971599,77.594566",
        },
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("weather:", response.data); // why is this not being shown?
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [day]);
  return (
    <div className={styles.userInfoWeather}>
      <div className={styles.userInfo}>
        <div className={styles.image}>
          <img src={animatedImage} alt="not found" />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.user}>
            <div className={styles.name}>{localStorage.getItem("name")}</div>
            <div className={styles.mailId}>
              {localStorage.getItem("mailId")}
            </div>
            <div className={styles.userName}>
              {localStorage.getItem("userName")}
            </div>
          </div>
          <div className={styles.genres}>
            {localStorage.getItem("authenticated") &&
              JSON.parse(localStorage.getItem("selectedGenres")).map((i) => (
                <div>{i.genre}</div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.weather}>
        <div className={styles.dateTime}>
          <div className={styles.date}>{formattedDate}</div>
          <div className={styles.time}>{time}</div>
        </div>
        <div className={styles.weatherInfo}>
          <div className={styles.status}>
            <div>
              {data &&
              (data.current.condition.text.includes("cloudy") ||
                data.current.condition.text.includes("rain")) ? (
                <WiDayRainMix size="40px" />
              ) : (
                <WiDaySunnyOvercast size="40px" />
              )}
            </div>
            <div>{data && data.current.condition.text}</div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.temperature}>
            <div className={styles.tempText}>
              {data && data.current.temp_c} <sup>o</sup>C
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.wind}>
            <div className={styles.windInfo}>
              <TbWind size="1rem" />
              <div>
                <div>{data && data.current.wind_kph} km/h</div>
                <div>Wind</div>
              </div>
            </div>
            <div className={styles.windInfo}>
              <WiHumidity size="1" />
              <div>
                <div>{data && data.current.humidity} %</div>
                <div>Humidiy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileWeather;
