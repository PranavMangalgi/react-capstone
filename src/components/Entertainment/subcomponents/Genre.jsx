import React, { useState, useEffect } from "react";
import styles from "../entertainment.module.css";
import axios from "axios";
const movieApiKey = process.env.REACT_APP_MOVIE_KEY;
function Genre({ genre }) {
  const [genreObj, setGenreObj] = useState("");
  const [movies, setMovies] = useState();

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/genre/movie/list",
        params: { language: "en" },
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${movieApiKey}`,
        },
      };
      axios
        .request(options)
        .then(function (response) {
          const filterId = response.data.genres.find((i) => i.name === genre);
          console.log("record", filterId);
          setGenreObj(filterId);
        })
        .catch(function (error) {
          console.error(error);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/movie",
        params: {
          include_adult: "false",
          include_video: "false",
          language: "en-US",
          page: "1",
          sort_by: "popularity.desc",
        },
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${movieApiKey}`,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          const results = response.data.results.filter((movie) =>
            movie.genre_ids.includes(genreObj.id)
          );
          console.log("results", results.slice(0, 4));
          setMovies(results.slice(-4));
        })
        .catch(function (error) {
          console.error(error);
        });
    })();
  }, [genreObj]);
  console.log("movies", movies);
  return (
    <div className={styles.genre}>
      {genreObj && (
        <>
          <h2>{genreObj.name}</h2>
          <div className={styles.movies}>
            {movies&&movies.length>0?movies.map((movie) => (
              <>
                <div>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
              </>
            )):<h3 style={{marginBottom:'1rem'}}>No Movies in this genre</h3>}
          </div>
        </>
      )}
    </div>
  );
}

export default Genre;
