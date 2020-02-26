/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import data from './data.json';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  left: {
    padding: 8,
    margin: 8,
  },
});

export default function HomePage() {
  const classes = useStyles();
  const key = 'AIzaSyClAPoOqXhqVipG1zfveIEuqS6G4YYbLv4';

  const center = {
    lat: 10.8339336,
    lng: 106.7765443,
  };
  const zoom = 18;
  let map$ = null;
  const [name, setName] = useState('');
  const handleApiLoaded = (map, maps) => {
    map$ = map;

    map.data.addGeoJson(data);

    map.data.setStyle(function(feature) {
      let color = 'gray';
      if (feature.getProperty('selected')) {
        color = feature.getProperty('color');
      }
      return ({
        fillColor: color,
        strokeColor: color,
        strokeWeight: 1
      });
    });

    map.data.addListener('click', function(event) {
      event.feature.setProperty('selected', !event.feature.getProperty('selected'));
      setName(event.feature.getProperty('name'));
    });
  };

  const handleAdd = () => {
    map$.data.addGeoJson(data);
  };

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={3} className="p-3">
        <Paper className={classes.left}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <TextField
                label="Tên thửa"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                value={name}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs>
        <GoogleMapReact
          bootstrapURLKeys={{key: key}}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          height={'100%'}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
      </Grid>
    </Grid>
  );
}
