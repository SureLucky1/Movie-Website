import React, { useState, useEffect, useContext} from "react";
import "./Dess.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { addtoCart } from '../Redux/cartSlice'
import { addPrice } from '../Redux/priceSlice'
import context from "../../index";  
const Description = () => {
  const Dollar = useContext(context);
  const dispatch = useDispatch()
  const { movieId } = useParams();
  console.log(movieId);
  const [movieDetails, setMovieDetails] = useState({});
  const [pricee, setPrice] = useState(null);
  console.log(movieDetails);  
  const [movieTrailer, setmovieTrailer] = useState({});
  const rate = Math.floor(`${movieDetails.vote_average}` * 10) / 10;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        setMovieDetails(res.data);
      });
  }, [movieId]);
  console.log("movieDetails", movieDetails);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        setmovieTrailer(res.data);
      });
  }, [movieId]);
  useEffect(() => {

                     if (movieDetails.vote_average >= 8.2) {
                      setPrice(Dollar.top_rated);
                     } else if (movieDetails.popularity >= 1400) {
                      console.log(movieDetails.popularity)
                      setPrice(Dollar.popular);
                     } else {
                      setPrice(Dollar.general);
                     }
  }, [movieDetails]);
  console.log("movieTailer", movieTrailer);
  const cartItems = useSelector(state => state.cart.cart);
  
  return (
    <section className="backdrop" >
                             
        <style>
        {`
    .mcontent-big {
background-position: center;
      background-size: contain;
      background-image: url('https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}');
        `}
      </style> 
      <div className="mcontent-big" >
        <div className="mcleft">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            className="poster"
            alt="poster"
          />
        </div>
        <div className="mcright">
          <div className="filmAndRate">
            <p class="des-title">{movieDetails.title}</p>
            <span id="rate">{rate}</span>

<h1>${pricee}</h1>
<button className="btn btn-warning" onClick={() => {
  dispatch(addtoCart({title: movieDetails.original_title, image: `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`, price: pricee}));
  dispatch(addPrice({title: movieDetails.original_title, price: pricee}));
  }}>
    Add to cart
</button>
          </div>
          <span id="releaseDate">Release Date:{movieDetails.release_date}</span>
          <div class="des-genres">
            {movieDetails.genres?.map((ge) => (
              <Link
                to={`/moviesGenres/${ge.id}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <span id="genres">{ge.name}</span>
              </Link>
            ))}
          </div>
          <span id="tagline">{movieDetails.tagline}</span>
          <p className="des-info">MOVIE INFO</p>
          <p class="overview">{movieDetails.overview}</p>
          <iframe
            width="fit-content"
            height="515"
            src={`https://www.youtube.com/embed/${movieTrailer.results?.[0]?.key}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div class="des-flex">
            <Link to={`/`}>
              <button className="des-button" onClick={() => navigate(-2)}>
                BACK
              </button>
            </Link>
          </div>
        </div>
      </div>
        <div className="mcontent">
      <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
          alt="filmBackground"
          className="poster"
        />
          <div className="filmAndRate">
            <p class="des-title">{movieDetails.title}</p>
            <span id="rate">{rate}</span>

          </div>
          <h1>${pricee}</h1>
          <span id="releaseDate">Release Date:{movieDetails.release_date}</span>
          <div class="des-genres">
            {movieDetails.genres?.map((ge) => (
              <Link
                to={`/moviesGenres/${ge.id}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <span id="genres">{ge.name}</span>
              </Link>
            ))}
          </div>
          <h4 id="tagline">{movieDetails.tagline}</h4>
          <p className="des-info">MOVIE INFO</p>
          <p class="overview">{movieDetails.overview}</p>
          <iframe
          className="iframe"

            src={`https://www.youtube.com/embed/${movieTrailer.results?.[0]?.key}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div class="des-flex">
            <Link to={`/`}>
              <button className="des-button" onClick={() => navigate(-2)}>
                BACK
              </button>
            </Link>
            <button className="btn btn-warning" onClick={() => {
  dispatch(addtoCart({title: movieDetails.original_title, image: `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`, price: pricee}));
  dispatch(addPrice({title: movieDetails.original_title, price: pricee}));
  }}>
    BUY
</button>
          </div>

      </div>


    </section>
  );
};

export default Description;
