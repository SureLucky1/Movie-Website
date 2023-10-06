import React, { useState, useEffect } from "react";
import "./GenresPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const GenresPage = ({ moviesGenres }) => {
  const { genres } = useParams();
  const [genreMovies, setGenreMovies] = useState(Array(20).fill({}));
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [favorite, setFavorite] = useState(
    () => JSON.parse(localStorage.getItem("favorite")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genres}&api_key=6a3a9e9a61085d657b30d36d1c7b5ba7&page=${pageNum}`
      )
      .then((res) => {
        setGenreMovies(res.data.results);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      });
  }, [genres, pageNum]);
  console.log("genreMovies", genreMovies);

  function heartFunction(movieId) {
    if (favorite.includes(movieId)) {
      setFavorite(favorite.filter((id) => id !== movieId));
    } else {
      setFavorite([...favorite, movieId]);
    }
    localStorage.setItem("favorite", JSON.stringify([...favorite, movieId]));
  }

  return (
    <div>
      <h1 className="slider_title">{moviesGenres.name}</h1>
      <div>
        <div className="flex-parent">
          {genreMovies.map((post) =>
            isLoading ? (
              <div className="moviebox">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton duration={2} height={300} />
                </SkeletonTheme>
              </div>
            ) : (
              <div className="moviebox">
                <Link
                  to={`/movie/${post.id}`}
                  key={post.id}
                  style={{ textDecoration: "none" }}
                >
                  <a
                    style={{ textDecoration: "none", color: "#fff" }}
                    href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                    target="_blank"
                  >
                    {post.poster_path ? (
                      <img
                        className="movieimg"
                        src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                      />
                    ) : (
                      <div className="noimg"></div>
                    )}
                    <p className="caption">{`${post.original_title}`}</p>
                    <div className="star-rating">
                      {post.vote_average >= 2 ? (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                        />
                      ) : (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                        />
                      )}
                      {post.vote_average >= 4 ? (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                        />
                      ) : (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                        />
                      )}
                      {post.vote_average >= 6 ? (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                        />
                      ) : (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                        />
                      )}
                      {post.vote_average >= 8 ? (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                        />
                      ) : (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                        />
                      )}
                      {post.vote_average >= 10 ? (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                        />
                      ) : (
                        <img
                          alt=""
                          width="20px"
                          src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                        />
                      )}
                      {post.vote_average !== 0 && ` (${post.vote_average})`}
                    </div>
                  </a>
                </Link>
                <Link>
                  <button
                    className="heart_btn"
                    onClick={() => heartFunction(post.id)}
                  >
                    {favorite.includes(post.id) ? (
                      <img
                        className="heart_img"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                      />
                    ) : (
                      <img
                        className="heart_img_black"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                      />
                    )}
                  </button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
      <div className="prev-next-parent">
        <div>
          {pageNum > 1 && (
            <button
              type="button"
              className="prev-btn"
              onClick={() => {
                setPageNum(pageNum - 1);
              }}
            >
              Prev page
            </button>
          )}
        </div>
        <div>
          <p className="content">
            Page{" "}
            <input
              type="number"
              className="pageInput"
              value={pageNum}
              onChange={(e) => {
                if (e.target.value > 0 && e.target.value < 501) {
                  Math.floor(setPageNum(e.target.value));
                }
              }}
            />
          </p>
        </div>
        <div>
          <button
            typr="button"
            className="next-btn"
            onClick={() => {
              setPageNum(pageNum + 1);
            }}
          >
            Next page
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenresPage;
