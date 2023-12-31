import "./App.css";
import { Provider } from "react-redux";
import { MyContextProvider } from "./index";
import store from "./Components/Redux/store";
import { Routes, Route, useLocation} from "react-router-dom";

import Home from "./Components/Home";
import Description from "./Components/Des/Des";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import MoviePage from "./Components/MoviePage/MoviePage";
import GenresPage from "./Components/GenresPage/GenresPage";
import TopUp from "./Components/TopUp/TopUp"; 
import Dropdownn from "./Components/Navbar/test"
import Chectout from "./Components/Chectout/Chectout";
function App() {
  const location = useLocation();   
  const [overFlow, setOverFlow] = useState(null);
  const [marginTop, setmarginTop] = useState(null);
  const [posts, setPosts] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        console.log(res);
        setPosts(res.data.results);
      });
  }, []);
  console.log("post", posts);

  const movieGenres = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7"
      )
      .then((res) => {
        console.log("genres", res.data.genres);
        setMoviesGenres(res.data.genres);
      });
  };

  useEffect(() => {
    movieGenres();
  }, []);
  useEffect(() => {
    if(location.pathname.includes("/movie/")){
      setOverFlow("none");
      setmarginTop("0px")
    }else{setOverFlow("hidden");
    setmarginTop("60px")
    }

  });
  const Dollar = {
    popular: 110,
    top_rated: 70,
    general: 40
  };
  /*
  const Dollar = [
{popular: 70},
{topRate: 60},
{general: 40}
  ];*/
  return (
<Provider store={store}>
<MyContextProvider value={ Dollar }>
      <Dropdownn moviesGenres={moviesGenres} />
    <main className="App">
      <style>
        {`
.App {
 overflow: ${overFlow};
 margin-top:${marginTop};
}
        `}
      </style>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/movies/:type" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<Description />} />
        <Route
          path="/moviesGenres/:genres"
          element={<GenresPage moviesGenres={moviesGenres} />}
        />
        <Route path="/checkout" element={<Chectout />}></Route>
      </Routes>
      <TopUp />
    </main>
    </MyContextProvider>
    </Provider >
  );
}

export default App;
