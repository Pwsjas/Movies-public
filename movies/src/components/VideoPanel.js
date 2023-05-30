import { React, useState } from 'react';
import './VideoPanel.scss';

export default function VideoPanel(props) {

    return (
        <iframe height='200' allow="fullscreen;" frameBorder="0"
            src={`https://www.youtube.com/embed/${props.url}`}>
        </iframe>
    );
};