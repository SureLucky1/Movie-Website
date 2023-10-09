import React, { useState, useEffect } from "react";
import "./containerr.css";
import axios from "axios";
import { Link } from "react-router-dom";


function Container() {
  const [topRated, setTopRated] = useState([]); 
  const [upComing, setUpComing] = useState([]); 
  const [nowPlaying, setNowPlaying] = useState([]); 
  const [trending, setTrending] = useState([]); 
  const [search, setSearch] = useState([]); 
  const [pageNum, setPageNum] = useState(1); 
  const [nowPlayingPageNum, setNowPlayingPageNum] = useState(1); 
  const [upComingPageNum, setUpComingPageNum] = useState(1); 
  const [searchPageNum, setSearchPageNum] = useState(1); 
  const [inputText, setInputText] = useState(() => JSON.parse(localStorage.getItem('inputText')) || 'movie'); 
  const [adult, setAdult] = useState(() => JSON.parse(localStorage.getItem('adult')) || 'false'); 
  const [language, setLanguage] = useState(() => JSON.parse(localStorage.getItem('language')) || 'en'); 
  const [region, setRegion] = useState(() => JSON.parse(localStorage.getItem('region')) || 'US'); 

  const [favorite, setFavorite] = useState(() => JSON.parse(localStorage.getItem("favorite")) || []);

  useEffect(() => { 
    localStorage.setItem("favorite", JSON.stringify(favorite)); 
  }, [favorite]); 

  useEffect(() => { 
    localStorage.setItem("inputText", JSON.stringify(inputText)); 
  }, [inputText]); 

  useEffect(() => { 
    localStorage.setItem("adult", JSON.stringify(adult)); 
  }, [adult]); 

  useEffect(() => { 
    localStorage.setItem("language", JSON.stringify(language)); 
  }, [language]); 

  useEffect(() => { 
    localStorage.setItem("region", JSON.stringify(region)); 
  }, [region]); 
  
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        console.log(res);
        setTopRated(res.data.results);
      });
  }, []); 

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7&page=${pageNum}`
      )
      .then((res) => {
        console.log(res);
        setTrending(res.data.results);
      });
  }, [pageNum]); 

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7&page=${nowPlayingPageNum}`
      )
      .then((res) => {
        console.log(res);
        setNowPlaying(res.data.results);
      });
  }, [nowPlayingPageNum]); 
  
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7&page=${upComingPageNum}`
      )
      .then((res) => {
        console.log(res);
        setUpComing(res.data.results);
      });
  }, [upComingPageNum]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7&page=${searchPageNum}?&query=${inputText}?&include_adult=${adult}&language=${language}&region=${region}`
      )
      .then((res) => {
        console.log(res);
        setSearch(res.data.results);
      });
  }, [searchPageNum, adult, language, region, inputText]);

  var slider1holder = document.getElementById("slider1");
  var photobannerholder = document.getElementsByClassName("photobanner")[0];
  document.documentElement.style.setProperty(
    "--bannerwidth",
    `${topRated.length * 23}vw`
  ); 
  var slider1holder = document.getElementById("slider2"); 

  function pauseSlider() {
    photobannerholder.style.animationPlayState = "paused";
  }

  function runSlider() {
    photobannerholder.style.animationPlayState = "running";
  }

  const heartholder = document.getElementsByClassName("heart_img"); 

  function heartFunction(movieId) {
    if (favorite.includes(movieId)) {
      setFavorite(favorite.filter(id => id !== movieId));
    } else {
      setFavorite([...favorite, movieId]); 
    }
    localStorage.setItem("favorite", JSON.stringify([...favorite, movieId])); 
  }

  return (
    <section>
      <Link to={`/movies/top_rated`} style={{ textDecoration: "none", color: "#fff" }}>
        <h1 className="slider_title">Top-rated</h1>
      </Link>
      
      <section id="slider1">
        <div
          onMouseOver={pauseSlider}
          onMouseOut={runSlider}
          className="photobanner"
        >
          {topRated.map((post) => (
            <Link
              to={`/movie/${post.id}`}
              className="sliderbox"
            >
              <a
                key={post.index}
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto"}}
                target="_blank"
              >
                <img
                  className="sliderimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">
                  {`${post.original_title}`}
                  {post.vote_average !== 0 && ` - ${Math.floor(post.vote_average * 10) / 10}`}
                </p>
              </a>
            </Link>
          ))}
          {topRated.map((post) => (
            <Link
              to={`/movie/${post.id}`}
              className="sliderbox"
            >
              <a
                key={post.index + 20}
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto"}}
                href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                target="_blank"
              >
                <img
                  className="sliderimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">
                  {`${post.original_title}`}
                  {post.vote_average !== 0 && ` - ${post.vote_average}`}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <h1 className="slider_title">Today's Trending</h1>
      <div>
        <div className="flex-parent">
          {trending.map((post) => (
            <div className="moviebox">
            <Link to={`/movie/${post.id}`} style={{ textDecoration: "none" }}>
              <a
                target="_blank"
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto" }}
              >
                <img
                  className="movieimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">{`${post.original_title}`}</p>
                <div className="star-rating">
                  {post.vote_average >= 2 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 4 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 6 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 8 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 10 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average !== 0 && ` (${Math.floor(post.vote_average * 10) / 10})`}
                </div>
              </a>
            </Link>
            <Link>
              <button className='heart_btn' onClick={() => heartFunction(post.id)}>
                  {favorite.includes(post.id) ? 
                  <img
                    className="heart_img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                  />
                   : <img
                   className="heart_img_black"
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                 />}
              </button>
            </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='prev-next-parent'>
        <div>
          {(pageNum > 1) && <button type='button' className='prev-btn' onClick={()=>{setPageNum(pageNum - 1)}}>Prev page</button>}
        </div>
        <div>
          <p className='content'>
            Page <input type='number'className="pageInput" value={pageNum} onChange={(e)=>{if(e.target.value > 0 && e.target.value < 501){Math.floor(setPageNum(e.target.value))}}} />
          </p>
        </div>
        <div>
          <button typr='button' className='next-btn' onClick={()=>{setPageNum(pageNum + 1)}}>Next page</button>
        </div>
      </div>

      <Link to={`/movies/now_playing`} style={{ textDecoration: "none", color: "#fff" }}>
      <h1 className="slider_title">Now-playing</h1>
      </Link>
      <section>
        <div className="flex-parent">
          {nowPlaying.map((post) => (
            <div className="moviebox">
            <Link to={`/movie/${post.id}`} style={{ textDecoration: "none" }}>
              <a
                target="_blank"
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto" }}
              >
                <img
                  className="movieimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">{`${post.original_title}`}</p>
                <div className="star-rating">
                  {post.vote_average >= 2 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 4 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 6 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 8 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 10 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average !== 0 && ` (${Math.floor(post.vote_average * 10) / 10})`}
                </div>
              </a>
            </Link>
            <Link>
              <button className='heart_btn' onClick={() => heartFunction(post.id)}>
                  {favorite.includes(post.id) ? 
                  <img
                    className="heart_img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                  />
                   : <img
                   className="heart_img_black"
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                 />}
              </button>
            </Link>
            </div>
          ))}
        </div>
      </section>
      <div className='prev-next-parent'>
        <div>
          {(nowPlayingPageNum > 1) && <button type='button' className='prev-btn' onClick={()=>{setNowPlayingPageNum(nowPlayingPageNum - 1)}}>Prev page</button>}
        </div>
        <div>
          <p className='content'>
            Page <input type='number'className="pageInput" value={nowPlayingPageNum} onChange={(e)=>{if(e.target.value > 0 && e.target.value < 501){Math.floor(setNowPlayingPageNum(e.target.value))}}} />
          </p>
        </div>
        <div>
          <button typr='button' className='next-btn' onClick={()=>{setNowPlayingPageNum(nowPlayingPageNum + 1)}}>Next page</button>
        </div>
      </div>
      
      <Link to={`/movies/upcoming`} style={{ textDecoration: "none", color: "#fff" }}>
      <h1 className="slider_title">Upcoming</h1>
      </Link>
      <section>
        <div className="flex-parent">
          {upComing.map((post) => (
            <div className="moviebox">
            <Link to={`/movie/${post.id}`} style={{ textDecoration: "none" }}>
              <a
                target="_blank"
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto" }}
              >
                {
                  (post.poster_path)? 
                  <img
                  className="movieimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                : <div className="noimg"></div>
                }
                
                <p className="caption">{`${post.original_title}`}</p>
                <div className="star-rating">
                  {post.vote_average >= 2 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 4 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 6 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 8 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 10 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average !== 0 && ` (${Math.floor(post.vote_average * 10) / 10})`}
                </div>
              </a>
            </Link>
            <Link>
              <button className='heart_btn' onClick={() => heartFunction(post.id)}>
                  {favorite.includes(post.id) ? 
                  <img
                    className="heart_img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                  />
                   : <img
                   className="heart_img_black"
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                 />}
              </button>
            </Link>
            </div>
          ))}
        </div>
      </section>
      <div className='prev-next-parent'>
        <div>
          {(upComingPageNum > 1) && <button type='button' className='prev-btn' onClick={()=>{setUpComingPageNum(upComingPageNum - 1)}}>Prev page</button>}
        </div>
        <div>
          <p className='content'>
            Page <input type='number'className="pageInput" value={upComingPageNum} onChange={(e)=>{if(e.target.value > 0 && e.target.value < 501){Math.floor(setUpComingPageNum(e.target.value))}}} />
          </p>
        </div>
        <div>
          <button typr='button' className='next-btn' onClick={()=>{setUpComingPageNum(upComingPageNum + 1)}}>Next page</button>
        </div>
      </div>

      <div className='search-parent'>
        <h1 className="slider_title">Filter</h1>
        <input type='text' id='searchbar' value={inputText} onChange={(e)=>{setInputText(e.target.value); setSearchPageNum(1)}} />
        <select className="filter-dropdown" value={adult} onChange={(e)=>{setAdult(e.target.value); setSearchPageNum(1)}}>
          <option className="filter-dropdown-item" value="false">Normal</option>
          <option className="filter-dropdown-item" value="true">Adult</option>
        </select>
        <select className="filter-dropdown" value={language} onChange={(e)=>{setLanguage(e.target.value); setSearchPageNum(1)}}>
          <option className="filter-dropdown-item" value="en-US">English</option>
          <option className="filter-dropdown-item" value="zh-HK">Cantonese</option>
          <option className="filter-dropdown-item" value="zh-TW">Taiwanese Mandarin</option>
          <option className="filter-dropdown-item" value="cn-CN">Mainland Mandarin</option>
          <option className="filter-dropdown-item" value="ja-JP">Japanese</option>
          <option className="filter-dropdown-item" value="ko-KR">Korean</option>
          <option className="filter-dropdown-item" value="en-GB">UK</option>
        </select>
        <select className="filter-dropdown" value={region} onChange={(e)=>{setRegion(e.target.value); setSearchPageNum(1)}}>
          <option className="filter-dropdown-item" value="US">US</option>
          <option className="filter-dropdown-item" value="HK">Hong Kong</option>
          <option className="filter-dropdown-item" value="TW">Taiwan</option>
          <option className="filter-dropdown-item" value="CN">China</option>
          <option className="filter-dropdown-item" value="JP">Japan</option>
          <option className="filter-dropdown-item" value="KR">Korea</option>
          <option className="filter-dropdown-item" value="GB">UK</option>
        </select>
      </div>
      
      <section>
        <div className="flex-parent">
          {search.map((post) => (
            <div className="moviebox">
            <Link to={`/movie/${post.id}`} style={{ textDecoration: "none" }}>
              <a
                target="_blank"
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto" }}
              >
                {
                  (post.poster_path)? 
                  <img
                  className="movieimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                : <div className="noimg"></div>
                }
                
                <p className="caption">{`${post.original_title}`}</p>
                <div className="star-rating">
                  {post.vote_average >= 2 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 4 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 6 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 8 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average >= 10 ? (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png"
                    />
                  )}
                  {post.vote_average !== 0 && ` (${Math.floor(post.vote_average * 10) / 10})`}
                </div>
              </a>
            </Link>
            <Link>
              <button className='heart_btn' onClick={() => heartFunction(post.id)}>
                  {favorite.includes(post.id) ? 
                  <img
                    className="heart_img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                  />
                   : <img
                   className="heart_img_black"
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                 />}
              </button>
            </Link>
            </div>
          ))}
        </div>
      </section>
      <div className='prev-next-parent'>
        <div>
          {(searchPageNum > 1) && <button type='button' className='prev-btn' onClick={()=>{setSearchPageNum(searchPageNum - 1)}}>Prev page</button>}
        </div>
        <div>
          <p className='content'>
            Page <input type='number'className="pageInput" value={searchPageNum} onChange={(e)=>{if(e.target.value > 0 && e.target.value < 501){Math.floor(setSearchPageNum(e.target.value))}}} />
          </p>
        </div>
        <div>
          <button typr='button' className='next-btn' onClick={()=>{setSearchPageNum(searchPageNum + 1)}}>Next page</button>
        </div>
      </div>
      
    </section>
  );
}

export default Container;
