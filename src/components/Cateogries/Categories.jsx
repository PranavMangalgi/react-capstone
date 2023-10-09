import { useState, useEffect } from "react";
import styles from "./categories.module.css";
import { FiAlertTriangle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
function Categories() {
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  const [movieCategories, setMovieCategories] = useState([
    {
      genre: "Action",
      img: "https://i0.wp.com/thinkmonsters.com/speakinghuman/media/wp-content/uploads/John-Wick-Posters-Rule.jpg?fit=1280%2C640&ssl=1",
      color: "#FF5209",
      isSelected: false,
    },
    {
      genre: "Drama",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4O4LstRjD8vQNNHW3SUA_G5W4ksbDQLrlIBHvOonpV94tG0kd",
      color: "#D7A4FF",
      isSelected: false,
    },
    {
      genre: "Romance",
      img: "https://www.businessinsider.in/_next/image?url=https%3A%2F%2Fstaticbiassets.in%2Fthumb%2Fmsid-36357233%2Cwidth-700%2Cresizemode-4%2Cimgsize-203437%2Fwhy-the-fault-in-our-stars-author-wrote-a-fictional-book-about-cancer.jpg&w=2048&q=75",
      color: "#148A08",
      isSelected: false,
    },
    {
      genre: "Thriller",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR__WJ3leuUG0I6VKnnqjAHj1TS00arbdRyIuhEI6Qi9kv_-PlV",
      color: "#84C2FF",
      isSelected: false,
    },
    {
      genre: "Western",
      img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkezgPtC07KY0isN_dw_SawfW8mGECOmWXjas9xnxIPnmbB2a1",
      color: "#902500",
      isSelected: false,
    },
    {
      genre: "Horror",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vhiU0BeBKfPPvUF5Jz9IabIaVT9n5cYOdbpoFNlMmwZSbYGO",
      color: "#7358FF",
      isSelected: false,
    },
    {
      genre: "Fantasy",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ5wB7uq0Mt70gItEFvIDUIyhlua4bKRZxm0N486zEw-1R-d0w4",
      color: "#FF4ADE",
      isSelected: false,
    },
    {
      genre: "Music",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQBX66iYv-6wU6Lq09SErFPipiJPqExzgihpcPBI3L02PSkIN91",
      color: "#E61E32",
      isSelected: false,
    },
    {
      genre: "Fiction",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSURCjrEOfnoIkB0b3MnnbnPHNV0SLWZhSrYC7ROr9NaxZl3RJY",
      color: "#6CD061",
      isSelected: false,
    },
  ]);
  useEffect(() => {
    const filter = movieCategories.filter(
      (category) => category.isSelected === true
    );
    setSelected(filter);
  }, [movieCategories]);

  const submitInfo = () => {
    
    setError(selected.length < 3);
    selected.length>=3&& navigate('/')

  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftContainer}>
          <h1 className={styles.inputHeading}>Super app</h1>
          <h1 className={styles.desc}>Choose your entertainment category</h1>
          <div className={styles.display}>
            {selected.map((category) => (
              <div key={category.genre} className={styles.categoryGenre}>
                {category.genre}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setMovieCategories((prevCategories) =>
                      prevCategories.map((prevCategory) =>
                        prevCategory.genre === category.genre
                          ? {
                              ...prevCategory,
                              isSelected: false,
                            }
                          : prevCategory
                      )
                    )
                  }
                >
                  <MdOutlineCancel size="1rem" />
                </div>
              </div>
            ))}
          </div>

          {error && selected.length < 3 && (
            <label className={styles.error}>
              <FiAlertTriangle /> Minimum 3 category required
            </label>
          )}
        </div>
      </div>
      <div className={styles.categories}>
        {movieCategories.map((category) => (
          <Category
            key={category.genre}
            category={category}
            setMovieCategories={setMovieCategories}
          />
        ))}
      </div>
      <div className={styles.nextPageBtn}>
        <button onClick={submitInfo}>Next Page</button>
      </div>
    </div>
  );
}
const Category = ({
  category: { genre, img, color, isSelected },
  setMovieCategories,
}) => {
  // const [isSelected, setisSelected] = useState(false);

  return (
    <>
      <div
        className={`${styles.categoryComponent} ${
          isSelected ? styles.selected : ""
        }`}
        style={{ backgroundColor: `${color}` }}
        onClick={() =>
          setMovieCategories((prevCategories) =>
            prevCategories.map((prevCategory) =>
              prevCategory.genre === genre
                ? { ...prevCategory, isSelected: !isSelected }
                : prevCategory
            )
          )
        }
      >
        <div className={styles.genre}>{genre}</div>
        <div>
          <img src={img} alt="not found" />
        </div>
      </div>
    </>
  );
};

export default Categories;
