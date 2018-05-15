import React, {Component} from 'react';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Marker,
    withScriptjs,
    withGoogleMap,
    GoogleMap} from 'react-google-maps';
import './map.css';
import { compose } from 'recompose';
import {Config} from '../services/config';
import mapStyle from '../json/map-style';

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap defaultZoom={8}
               defaultCenter={{ lat: -34.397, lng: 150.644 }}
               defaultOptions={{ styles: mapStyle }}>
        <Marker position={{ lat: -34.397, lng: 150.644 }}/>
    </GoogleMap>
);
class Map extends Component {
    render() {
        return (
            <div className="map">
                    <MapWithAMarker
                        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=' + Config.mapKey}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `500px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
            </div>
        );
    }
}

export default Map;
