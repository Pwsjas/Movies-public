import { React, useState } from 'react';
import { constructImagePath } from '../helpers/dataOrganizers';
import './WatchProviders.scss';

export default function WatchProviders(props) {

    let buy = [];
    let buyLoaded = false;

    let rent = [];
    let rentLoaded = false;

    let stream = [];
    let streamLoaded = false;

    for (let provider of props.providers.buy) {
        buy.push(
            <div className='provider' key={provider.name}>
                <img src={constructImagePath(provider.icon)}></img>
                <p>{provider.name}</p>
            </div>
        );
        buyLoaded = true;
    }

    for (let provider of props.providers.rent) {
        rent.push(
            <div className='provider' key={provider.name}>
                <img src={constructImagePath(provider.icon)}></img>
                <p>{provider.name}</p>
            </div>
        );
        rentLoaded = true;
    }

    for (let provider of props.providers.stream) {
        stream.push(
            <div className='provider' key={provider.name}>
                <img src={constructImagePath(provider.icon)}></img>
                <p>{provider.name}</p>
            </div>
        );
        streamLoaded = true;
    }

    return (
        <div className='col'>
            <h1>Availability</h1>
            <div className='provider-container'>
                {buyLoaded === true &&
                    <div className='service-type'>
                        <h1>Buy</h1>
                        {buy}
                    </div>
                }

                {rentLoaded === true &&
                    <div className='service-type'>
                        <h1>Rent</h1>
                        {rent}
                    </div>
                }

                {streamLoaded === true &&
                    <div className='service-type'>
                        <h1>Stream</h1>
                        {stream}
                    </div>
                }
            </div>
        </div>
    );
};