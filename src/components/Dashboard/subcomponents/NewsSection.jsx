import React, { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import axios from "axios";

function NewsSection({ newsApiKey, formattedDate, time }) {
  const [news, setNews] = useState(null);
  let index;
  if (news) {
    index = Math.floor(Math.random() * news.length);
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${encodeURI(
            newsApiKey
          )}&q=olympics`
        );
        console.log(response.data);
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
  }, []);
  console.log("news:", news);
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
        <div className={styles.content}>{news && news[index].content}</div>
        <div className={styles.button}>
          <button>Browse</button>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
