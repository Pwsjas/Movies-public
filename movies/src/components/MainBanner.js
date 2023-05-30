import { React, useState } from 'react';
import { constructImagePath, getGenreByID } from '../helpers/dataOrganizers';

import './MainBanner.scss';

export default function MainBanner(props) {

    let title = props.movie.title;
    let description = props.movie.description;
    let genres = genreConversion();
    let backdrop = props.movie.backdrop;

    function genreConversion() {
        let output = '';
        for (let num of props.movie.genres) {
            output += `${getGenreByID(num)}, `;
        }
        output = output.substring(0, output.length - 2)
        return output;
    }

    return (
        <div className='main-banner-container'>
            <img src={constructImagePath(backdrop)}></img>
            <div className='main-banner-content'>
                <h1>{title}</h1>
                <p>{description}</p>
                <p className='main-banner-genres'>{genres}</p>
                <a href={`/movie/${props.movie.movieID}`}><button>More Info</button></a>
            </div>
        </div>
    );
};