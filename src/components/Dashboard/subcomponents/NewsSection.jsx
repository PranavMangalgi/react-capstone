import React, { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import axios from "axios";
// import { newsApiKey } from "../../../API_KEY";
import { useNavigate } from "react-router-dom";
const newsApiKey= process.env.REACT_APP_NEWS_API_KEY;

function NewsSection({ formattedDate, time, hour }) {
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  let index;
  if (news) {
    index = Math.floor(Math.random() * news.length);
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${newsApiKey}&q=olympics`
        );
        setNews(
          response.data.results.filter(
            (news) =>
              news.language === "english" && news.image_url && news.content
          )
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [hour]);
  return (
    <div className={styles.newsSection}>
      <div className={styles.newsCard}>
        <div className={styles.newsImage}>
          <img src={news && news[index].image_url} alt="" />
        </div>
        <div className={styles.heading}>
          <h4>{news && news[index].title}</h4>
          <div className={styles.date}>
            <div>{formattedDate}</div> <hr className={styles.dateHr} />
            <div>{time}</div>
          </div>
        </div>
        <div className={styles.content}>
          <p>{news && news[index].content}</p>
        </div>
        <div className={styles.button}>
          <button onClick={() => navigate("/entertainment")}>Browse</button>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
