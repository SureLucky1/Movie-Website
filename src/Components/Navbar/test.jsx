import React, { useState, useEffect, useRef } from 'react';
import './test.css';
import axios from "axios";
import { Link } from "react-router-dom";
import {
    NavbarBrand,
    NavLink
  } from "reactstrap";
function Dropdownn({ }) {
    const [showw, setShoww] = useState(false);
    const [show, setShow] = useState(false);
    const [rotate, setRotate] = useState('0deg');
    const [text, setText] = useState('Everything');
    const [placeholder, setPlaceholder] = useState('Search Anything...');
    const [info, setInfo] = useState("");
    const [category, setCategory] = useState("");
    const [movies, setMovies] = useState([]);
    const [moviesGenress, setMoviesGenress] = useState([]);
    const searchMovies = () => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${info}`
        )
        .then((response) => {
          const data = response.data;
          console.log(response);
          setMovies(data.results);
        });
    };
    const searchCategory = () => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${category}`
        )
        .then((response) => {
          const data = response.data;
          setMovies(data.results);
        });
    };
    
    const movieGenres = () => {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7"
        )
        .then((res) => {
          setMoviesGenress(res.data.genres);
        });
    };
    useEffect(() => {
      if (info) {
        searchMovies();
      } else {
        setMovies([]);
      }
    }, [info]);
    useEffect(() => {
      if (category) {
        searchCategory();
      } else {
        setMovies([]);
      }
    }, [category]);
    useEffect(() => {
      movieGenres();
    }, []);
  const listItems = moviesGenress;

    useEffect(() => {
        if (show) {
            setRotate('0deg');
        } else {
            setRotate('-180deg');
        }
    }, [show]);
    const downRef = useRef();
    const listRef = useRef();
    
    window.addEventListener("click", (e)=>{
        if(e.target !== downRef.current && e.target !== listRef.current){
    
            setShow(false);
        }
      })
    return (
        <header className='open'>
        <div className="search-bar">
        <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }} className='theme'>
            <NavbarBrand className="NavbarBrand" data-spotlight="C I N E P H I L E">
            C I N E P H I L E
            </NavbarBrand>
          </Link>
            <div className="dropdown" >
                <div id="drop-text" className="dropdown-text" ref={downRef} onClick={() => {setShow(!show); setShoww(false);}} >
                    <span  id="span" >{text}</span>
                    <i id="icon" className="fa-solid fa-chevron-down" style={{ transform:`rotate(${rotate})`,transitionDuration: "0.3s"}}></i>
                </div>
                {show && (
                    <ul id="list" className="dropdown-list" ref={listRef}>
                        <li className="dropdown-list-item" onClick={() => {
                                setText("Popular");
                                setPlaceholder(`Search in Popular...`);}}>
                                <Link
                            to={"movies/popular"}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <NavLink className="popular" >Popular</NavLink>
                          </Link></li>
                        <li className="dropdown-list-item" onClick={() => {
                                setText("Top Rated");
                                setPlaceholder(`Search in Top Rated...`);}}>
                                <Link
                            to={"movies/top_rated"}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <NavLink className="topRated">Top-rated</NavLink>
                          </Link></li>
                        {listItems.map((item, index) => (
                            <li key={index} className="dropdown-list-item"onClick={() => {
                                setText(item.name);
                                if (item.name === 'Everything') {
                                    setPlaceholder('Search Anything...');
                                } else {
                                    setPlaceholder(`Search in ${item.name}...`);
                                }
                            }}><Link
                            to={`moviesGenres/${item.id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <NavLink className="dropdown-item" >{item.name}</NavLink></Link></li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="searchGroup">
            <div className="search-box">
                <input type="text" id="search-input" value={info} onChange={(e) => {
                      setInfo(e.target.value);
                      if(e.target.value){
                          setShoww(true);
                          setShow(false);
                      }else{
                        setShoww(false)
                      }
                      setMovies(movies.filter(f => f.title.toLowerCase().includes(e.target.value)))
                    }}placeholder={placeholder} />
            </div>
             {showw === true &&<div className="bg-white shadow border">
            <div>
            {movies.map((d, i) => (
                        <div className="videoSet"key={i} onBlur={() => {setTimeout(() => {setShoww(false)}, 0)}}>
                                          <Link
                  to={`/movie/${d.id}`}
                  style={{ textDecoration: "none" }}
                 className='link'
                 >                            
                            <img src={`https://image.tmdb.org/t/p/original/${d.poster_path}`} alt="" />
                            <div>
                            <h1>{d.title}</h1>
                            <p>{d.name}</p>
                        </div>
                        </Link>

                        </div>
                    ))}
            </div>
        
                </div>}
        </div>
        <Link to="/checkout"><h4>Cart<small> </small></h4></Link>
        </div>

        </header>
    );
}

export default Dropdownn;