import React, {Component} from 'react';
import {reactLocalStorage as storage} from 'reactjs-localstorage';
import {Config, headers} from './config';


class AuthService extends Component {
    static isSignedIn() {
        return storage.get('APP_SIGNED_IN') === 'signed-in';
    }

    static setSignedIn(isSigned) {
        storage.set('APP_SIGNED_IN', isSigned ? 'signed-in' : '');
    }

    static authGgToken(token) {
        const { language, userAgent } = window.navigator;

        return fetch(Config.backUrl + '/auth/gg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token, language, agent: userAgent})
        })
            .then(res => res.json());
    }

    static authAnonymousToken() {
        const { language, userAgent } = window.navigator;
        return fetch(Config.backUrl + '/auth', {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: JSON.stringify({language, agent: userAgent})
        })
            .then(res => res.json());
    }

    static setToken(token) {
        storage.set('APP_TOKEN', token);
    }

    static getToken() {
        return storage.get('APP_TOKEN');
    }

    static setAnonymToken(token) {
        storage.set('ANONYMOUS_TOKEN', token);
    }

    static getAnonymToken() {
        return storage.get('ANONYMOUS_TOKEN');
    }

    static getProfile() {
        return storage.getObject('APP_PROFILE');
    }

    static setProfile(profile) {
        storage.setObject('APP_PROFILE', profile);
    }

    static clearProfile() {
        storage.setObject('APP_PROFILE', {});
    }

}

export default AuthService;
