import React, {Component} from 'react';
import {reactLocalStorage as storage} from 'reactjs-localstorage';
import {Config} from './config';


class AuthService extends Component {
    static isSignedIn() {
        return storage.get('APP_SIGNED_IN') === 'signed-in';
    }

    static setSignedIn(isSigned) {
        storage.set('APP_SIGNED_IN', isSigned ? 'signed-in' : '');
    }

    static authToken(token) {
        return fetch(Config.backUrl + '/auth/gg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token})
        })
            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    static setToken(token) {
        storage.set('APP_TOKEN', token);
    }

    static getToken() {
        storage.get('APP_TOKEN');
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
