import { React, useEffect, useState } from 'react';
import { constructMovieLists } from './helpers/dataOrganizers';
import MovieList from './components/MovieList';
import MainBanner from './components/MainBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.scss';

function App() {

  const [movieLists, setMovieLists] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    constructMovieLists(3)
    .then((sortedMovieLists) => {
      setMovieLists(sortedMovieLists);
      setLoaded(true);
      console.log(sortedMovieLists);
    });
  }, []);

  return (
    <div className="app">
      <Navbar></Navbar>
      {loaded === true &&
        <>
          <MainBanner movie={movieLists[0][0]}></MainBanner>
        </>
      }
      {loaded === true &&
        <div>
          <MovieList movieList={movieLists[0]}></MovieList>
          <MovieList movieList={movieLists[1]}></MovieList>
          <MovieList movieList={movieLists[2]}></MovieList>
        </div>
      }
      <Footer></Footer>
    </div>
  );
}

export default App;
