import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MoviePanel from '../components/MoviePanel';
import { formatRecommendationList, constructImagePath } from '../helpers/dataOrganizers';
import { getMoviesBySearch } from '../helpers/movieAPI';
import './MovieSearch.scss';

export default function MovieSearch(props) {

    const [searchString, setSearchString] = useState(useParams().id || '');
    const [searchResults, setSearchResults] = useState([]);
    const [loadedResults, setLoadedResults] = useState();

    useEffect(() => {
        getMoviesBySearch(searchString)
        .then((data) => {
            let list = formatRecommendationList(data.results)
            let temp = [];
            for (let movie of list) {
                temp.push(
                    <MoviePanel
                        backdrop={constructImagePath(movie.backdrop)}
                        title={movie.title}
                        key={movie.movieID}
                        id={movie.movieID}>
                    </MoviePanel>
                )
            }
            setSearchResults(temp);
            setLoadedResults(true);
        })
    }, []);

    return (
        <div>
            <Navbar search={searchString}></Navbar>
            {loadedResults === true && 
                <div className='movieSearch-container'>
                    {searchResults}
                </div>
            }
        </div>
    );
};