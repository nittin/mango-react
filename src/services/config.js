import {reactLocalStorage as storage} from 'reactjs-localstorage';

export const ENV = process.env.NODE_ENV;

export const Config = {
    backUrl: ENV === 'production' ? 'https://plan-map-api.herokuapp.com' : 'http://192.168.1.5:5000',
    mapApi: 'https://maps.googleapis.com/maps/api/js?v=beta&libraries=geometry,drawing&key=',
    mapKey: 'AIzaSyClAPoOqXhqVipG1zfveIEuqS6G4YYbLv4',
};

export const GG_CLIENT_ID = '322961007679-dfld7mld06hm2g22va0qe3ta418vuar4.apps.googleusercontent.com';

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export function authorization() {
    const appToken = storage.get('APP_TOKEN');
    const anonymousToken = storage.get('ANONYMOUS_TOKEN');
    return {
        'Authorization': appToken ? appToken : anonymousToken,
    };
};
