import React, {Component} from 'react';
import {Config, headers, authorization} from './config';

class TripService extends Component {
    static getTrips() {
        return fetch(`${Config.backUrl}/trip`, {
            method: 'GET',
            headers: {
                ...headers,
                ...authorization(),
            },
        })
            .then(res => res.json());
    }

    static getTripById(id) {
        return fetch(`${Config.backUrl}/trip/${id}`, {
            method: 'GET',
            headers: {
                ...headers,
                ...authorization(),
            },
        })
            .then(res => res.json());
    }

    static getTripByShareId(id) {
        return fetch(`${Config.backUrl}/trip/share/${id}`, {
            method: 'GET',
            headers: {
                ...headers,
                ...authorization(),
            },
        })
            .then(res => res.json());
    }
}

export default TripService;
