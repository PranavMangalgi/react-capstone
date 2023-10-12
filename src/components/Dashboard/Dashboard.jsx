import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import animatedImage from "../../assets/animated-person.png";
import axios from "axios";
import { WiDayRainMix, WiHumidity } from "react-icons/wi";
import { TbWind } from "react-icons/tb";
import key, { newsApiKey } from "../../API_KEY";
// import everest from "../../assets/mt-everest.png";

function Dashboard() {
  const [data, setData] = useState(null);
  const [news, setNews] = useState(null);
  let index;
  if(news){
    index = Math.floor(Math.random()*news.length);
  }
  const navigate = useNavigate();
  const date = new Date();
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

  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      navigate("/register");
    }
  }, []);

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
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${encodeURI(newsApiKey)}&q=cryptocurrency`
        );
        console.log(response.data);
        setNews(response.data.results.filter(news=>news.language==='english'&&news.image_url&&news.content));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  console.log('news:',news);
  return (
    <div className={styles.container}>
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
                <WiDayRainMix size="80px" />
              </div>
              <div>{data && data.current.condition.text}</div>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.temperature}>
              <div className={styles.tempText}>
                {data && data.current.temp_c} <sup>o</sup>C
              </div>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.wind}>
              <div className={styles.windInfo}>
                <TbWind size="1.5rem" />
                <div>
                  <div>{data && data.current.wind_kph} km/h</div>
                  <div>Wind</div>
                </div>
              </div>
              <div className={styles.windInfo}>
                <WiHumidity size="1.5rem" />
                <div>
                  <div>{data && data.current.humidity} %</div>
                  <div>Humidiy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.newsSection}>
        <div className={styles.newsCard}>
          <div className={styles.newsImage}>
            <img src={news&&news[index].image_url} alt="" />
          </div>
          <div className={styles.heading}>
            <h4>{news&&news[index].title}</h4>
            <div className={styles.date}>
              <div>{formattedDate}</div> <hr className={styles.dateHr}/><div>{time}</div>

            </div>
          </div>
          <div className={styles.content}>
            {news&&(news[index].content)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
