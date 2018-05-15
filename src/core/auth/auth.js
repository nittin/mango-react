import React, {Component} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {
    Container, Row, Col, Button,
    Nav, NavItem, NavLink,
    Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import AuthService from './../../services/auth-service';

import './auth.css';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            profile: AuthService.getProfile(),
            token: AuthService.getToken(),
            isSignedIn: AuthService.isSignedIn(),
            menuOpened: false
        };
    }

    componentDidMount() {

    }
    toggleProfileMenu() {
        this.setState({
            menuOpened: !this.state.menuOpened
        });
    }
    render() {
        const clientId = '322961007679-dfld7mld06hm2g22va0qe3ta418vuar4.apps.googleusercontent.com';
        const success = response => {
            console.log(response);
            AuthService.setSignedIn(true);
            AuthService.setProfile(response.profileObj);
            AuthService.setToken(response.tokenObj.id_token);
            AuthService.authToken(response.tokenObj.id_token);
            this.setState({
                profile: response.profileObj,
                token: response.tokenObj.id_token,
                isSignedIn: true,
                menuOpened: false
            });
        };
        const error = () => {
            AuthService.setSignedIn(false);
            AuthService.clearProfile();
            this.setState({
                profile: {},
                token: null,
                isSignedIn: false
            });
        };
        const loading = () => {
            console.log('loading')
        };
        const logout = () => {
            AuthService.setSignedIn(false);
            AuthService.clearProfile();
            AuthService.setToken('');
            this.setState({
                profile: {},
                token: null,
                isSignedIn: false
            });
        };

        let formLogin = this.state.isSignedIn ?
            <div className="d-flex align-items-center">
                <div className="name-card flex-fill d-flex align-items-center"  onClick={this.toggleProfileMenu.bind(this)}>
                    <div className="name flex-fill">{this.state.profile.givenName}</div>
                    <div className="avt ml-2" id="s-profile">
                        <img className="avt-img" src={this.state.profile.imageUrl}/>
                    </div>
                    <Popover placement="bottom" className="auth" isOpen={this.state.menuOpened} target="s-profile" toggle={this.toggleProfileMenu.bind(this)}>
                        <PopoverBody>
                            <div className="d-flex align-items-center">
                                <div className="avt mr-2">
                                    <img className="avt-img" src={this.state.profile.imageUrl}/>
                                </div>
                                <div className="flex-fill">
                                    <h6 className="m-0">{this.state.profile.name}</h6>
                                    <div className="text-black-50">{this.state.profile.email}</div>
                                </div>
                            </div>
                        </PopoverBody>
                        <PopoverHeader className="d-flex justify-content-end pop-profile-foot">
                            <Button className="btn btn-primary ml-2" onClick={logout}>Sign out</Button></PopoverHeader>
                    </Popover>
                </div>

            </div>
            :
            <GoogleLogin
                clientId={clientId}
                scope="https://www.googleapis.com/auth/analytics"
                onSuccess={success}
                onFailure={error}
                onRequest={loading}
                className="btn btn-primary">
                <span>Sign in</span>
            </GoogleLogin>;
        return (
            <div className="auth">
                { formLogin }
            </div>
        );
    }
}

export default Auth;
