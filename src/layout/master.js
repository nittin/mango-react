import React, { Component } from 'react';
import Menu from './../core/menu/menu'
import { Config } from '../services/config';
import {
    Marker,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from 'react-google-maps';
import { compose } from 'recompose';

import MasterContext from './master.context';
import './master.less';

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap,
)(props =>
    <GoogleMap
        defaultZoom={6}
        defaultCenter={{lat: 10.8364205, lng: 106.8208828}}
        defaultOptions={{
            disableDefaultUI: true,
        }}
    >
        <Marker position={{lat: 10.8364205, lng: 106.8208828}}/>
    </GoogleMap>,
);

class Master extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };
    }

    setTitle(title) {
        this.setState({title});
    }

    render() {
        const {title} = this.state;
        return (
            <MasterContext.Provider value={{title, setTitle: this.setTitle.bind(this)}}>
                <div className="App">
                    <div className="app-map">
                        <div className="map">
                            <MapWithAMarker
                                googleMapURL={Config.mapApi + Config.mapKey}
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `100%`}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                            />
                        </div>

                        <div className="top d-flex flex-column">
                            <Menu/>

                            {this.props.children}
                        </div>
                    </div>
                </div>
            </MasterContext.Provider>
        );
    }
}

export default Master;
