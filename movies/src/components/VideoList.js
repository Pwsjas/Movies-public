import { React, useRef, useState, useEffect } from 'react';
import './VideoList.scss';
import VideoPanel from './VideoPanel';

export default function VideoList(props) {

    let videoList = [];

    for (let i = 0; i < props.videoList.length; i++) {
        if (props.videoList[i]) {
            videoList.push(
                <VideoPanel 
                    url={props.videoList[i].key} 
                    key={i} 
                    id={`panel${i}`}>
                </VideoPanel>
            )
        }
    }

    return (
        <div className="video-list-container">
            <h1 className='video-h1'>Related Videos</h1>
            <div className='video-list-panels'>
                    {videoList}
            </div>
        </div>
    );
};