import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { constructImagePath, formarWatchProviders, formatRecommendationList } from '../helpers/dataOrganizers';
import { getMovieDetailsByID, getMovieRecommendationsByID, getMovieVideosByID, getWatchProvidersByID } from '../helpers/movieAPI';
import Navbar from '../components/Navbar';
import VideoList from './VideoList';
import MovieList from './MovieList';
import { addMovie, login, addMovieToMyList, verifyMovieWithinMyList, removeMovieFromMyList } from '../helpers/userAPI';
import './MoviePage.scss';
import WatchProviders from './WatchProviders';
import { useCookies } from "react-cookie";

export default function MoviePage(props) {

    const [cookies, setCookie] = useCookies(["username", 'password']);
    const [movieID, setMovieID] = useState(useParams());
    const [movie, setMovie] = useState({});
    const [loadedMain, setLoadedMain] = useState();
    const [loadedRecommendations, setLoadedRecommendations] = useState();
    const [genres, setGenres] = useState('');
    const [recommendations, setRecomemndations] = useState();
    const [videos, setVideos] = useState([]);
    const [loadedVideos, setloadedVideos] = useState();
    const [watchProviders, setWatchProviders] = useState();
    const [loadedWatchProviders, setLoadedWatchProviders] = useState();
    const [colour, setColour] = useState('');
    const [currentColour, setCurrentColour] = useState('');

    useEffect(() => {
        //load movie details
        getMovieDetailsByID(movieID.id)
        .then((data) => {
            setMovie(data);
            let temp = '';
            for (let i of data.genres) {
                temp += `${i.name}, `;
            }
            setGenres(temp.substring(0, temp.length - 2));
            setLoadedMain(true);
        })

        //load recommended movies
        getMovieRecommendationsByID(movieID.id)
        .then((data) => {
            setRecomemndations(formatRecommendationList(data.results));
            setLoadedRecommendations(true);
        })

        //load extra videos
        getMovieVideosByID(movieID.id)
        .then((data) => {
            let temp = [];
            for (let i = 0; i<3; i++) {
                temp.push(data.results[i]);
            }
            setVideos(temp);
            setloadedVideos(true);
        })

        getWatchProvidersByID(movieID.id)
        .then((data) => {
            setWatchProviders(formarWatchProviders(data));
            setLoadedWatchProviders(true);
        })

        verifyMovieWithinMyList(cookies.username, movieID.id)
        .then((data) => {
            console.log(data);
            if (data) {
                setColour('-green');
                setCurrentColour('-green');
            } else {
                setColour('')
                setCurrentColour('')
            }
        })
      }, []);

      function myList() {
        login(cookies.username, cookies.password)
        .then((data) => {
            if (data) {
                addMovie(movieID.id)
                .then((data) => {
                    addMovieToMyList(cookies.username, movieID.id);
                })
            }
        })
      }

      function handleCurrentColour() {
        if (currentColour === '-green') {
            setCurrentColour('-red');
        } else {
            setCurrentColour('-green');
        }
      }

      function handleMouseLeaveColour() {
        setCurrentColour(colour);
      }

      function handleMyListClick() {
        if (colour === '-green') {
            //Remove from myList
            login(cookies.username, cookies.password)
            .then((data) => {
                if (data) {
                    removeMovieFromMyList(cookies.username, movieID.id)
                    .then((data) => {
                        if (data) {
                            setColour('');
                            setCurrentColour('');
                        }
                    })
                }
            })
        } else {
            //Add to myList
            myList()
            setColour('-green');
            setCurrentColour('-green');
        }
      }

    return (
        <div className='moviePage-container'>
            <Navbar></Navbar>
            {loadedMain === true &&
                <div className='movie-main-content-container'>
                    <img className='moviePage-backdrop' src={constructImagePath(movie.backdrop_path)}></img>
                    <div className='forward'>
                        <h1>{movie.original_title}</h1>
                        <p>{movie.overview}</p>
                        <p>{genres}</p>
                        {movie.runtime && 
                            <p>Duration: {movie.runtime} minutes</p>
                        }
                        <div className='row'>
                            <img className={`filter${currentColour} my-list`} onClick={() => handleMyListClick()} src={require('../assets/add.svg').default} onMouseEnter={() => handleCurrentColour()} onMouseLeave={() => handleMouseLeaveColour()}></img>
                        </div>
                    </div>
                </div>
            }
            {loadedWatchProviders === true && 
                <div className='providers'>
                    <WatchProviders providers={watchProviders}></WatchProviders>
                </div>
            }

            {loadedVideos === true &&
                <div className='videos'>
                    <VideoList videoList={videos}></VideoList>
                </div>
            }

            {loadedRecommendations === true && 
                <div>
                    <MovieList movieList={recommendations}></MovieList>
                </div>
            }
        </div>
    );
};