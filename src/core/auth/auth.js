import React, {Component} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {
    Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import {
    Button,
    Fab,
} from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import {GG_CLIENT_ID} from '../../services/config';
import AuthService from '../../services/auth.service';

import './auth.less';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            profile: AuthService.getProfile(),
            token: AuthService.getToken(),
            anonymous: AuthService.getAnonymToken(),
            isSignedIn: AuthService.isSignedIn(),
            menuOpened: false,
        };
    }

    componentDidMount() {
        if (!this.state.anonymous) {
            AuthService.authAnonymousToken().then(response => {
                AuthService.setAnonymToken(response.token);
            });
        }
    }
    toggleProfileMenu() {
        this.setState({
            menuOpened: !this.state.menuOpened
        });
    }

    onOAuthSuccess(response) {
        console.log(response);
        AuthService.setSignedIn(true);
        AuthService.setProfile(response.profileObj);
        AuthService.authGgToken(response.tokenObj.access_token).then(response => {
            AuthService.setToken(response.token);
        });

        this.setState({
            profile: response.profileObj,
            token: response.tokenObj.id_token,
            isSignedIn: true,
            menuOpened: false
        });
    }

    onOAuthFail() {
        AuthService.setSignedIn(false);
        AuthService.clearProfile();
        this.setState({
            profile: {},
            token: null,
            isSignedIn: false
        });
    }

    onOAuthRequest() {
        console.log('loading')
    }

    render() {
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
                            <Button onClick={logout}>Sign out</Button>
                        </PopoverHeader>
                    </Popover>
                </div>
            </div>
            :
            <GoogleLogin
                clientId={GG_CLIENT_ID}
                scope="https://www.googleapis.com/auth/analytics"
                onSuccess={this.onOAuthSuccess.bind(this)}
                onFailure={this.onOAuthFail.bind(this)}
                onRequest={this.onOAuthRequest.bind(this)}
                style={{}}
                tag="div"
                type="div"
            >
                <Fab size="small" color="primary">
                    <AccountCircleTwoToneIcon />
                </Fab>
            </GoogleLogin>;
        return (
            <div className="auth">
                { formLogin }
            </div>
        );
    }
}

export default Auth;
