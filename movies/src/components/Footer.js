import { React } from 'react';
import './Footer.scss';

export default function Footer(props) {

    return (
        <div className='footer-container'>
            <div className='footer-left'>
                <p>This website is powered by The Movie Database (TMDB)</p>
            </div>
            <div className='footer-right'>
                <p>Contact Info: Pwsjas433@gmail.com</p>
            </div>
        </div>
    );
};