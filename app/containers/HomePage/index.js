/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import messages from './messages';
import GoogleMapReact from 'google-map-react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Zoom from '@material-ui/core/Zoom';
import { apiMapKey, defaultCenter, defaultZoom } from './definition';
import useStyles from './styles';
import data from './data.json';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { changeLocale } from 'containers/LanguageProvider/actions';

export function HomePage(props) {
  const { locale, changeLocale } = props;
  const classes = useStyles();
  const center = defaultCenter;
  const zoom = defaultZoom;
  let map$ = null;
  const [name, setName] = useState('');
  const [open, setOpen] = useState(true);

  const handleApiLoaded = (map, maps) => {
    map$ = map;

    map.data.addGeoJson(data);

    map.data.setStyle((feature) => {
      let color = 'gray';
      if (feature.getProperty('selected')) {
        color = feature.getProperty('color');
      }
      return {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 1,
      };
    });

    map.data.addListener('click', (event) => {
      event.feature.setProperty('selected', !event.feature.getProperty('selected'));
      setName(event.feature.getProperty('name'));
    });
  };

  const handleAdd = () => {
    map$.data.addGeoJson(data);
  };

  const handleLang = (lang) => {
    changeLocale(lang);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCollapse = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.left}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" onClick={handleCollapse} className={classes.menuButton} color="inherit">
                <MenuOpenIcon/>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <FormattedMessage {...messages.header} />
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.menuContent} direction={'column'} spacing={2}>
            <Grid item>
              <TextField
                label={<FormattedMessage {...messages.slot} />}
                id="outlined-size-small"
                variant="outlined"
                size="small"
                value={name}
              />
            </Grid>
            <Grid item>
              <ButtonGroup size="small">
                <Button disabled={locale === 'en'} onClick={() => handleLang('en')}>EN</Button>
                <Button disabled={locale === 'vi'} onClick={() => handleLang('vi')}>VI</Button>
              </ButtonGroup>
            </Grid>
          </Grid>

        </div>
      </Drawer>
      <div className={classes.map}>
        <GoogleMapReact
          style={{position: 'static'}}
          bootstrapURLKeys={{key: apiMapKey}}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
        <Zoom in={!open} unmountOnExit>
          <Fab aria-label={''} className={classes.fab} color="secondary" onClick={handleOpen}>
            <MenuIcon/>
          </Fab>
        </Zoom>
      </div>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeLocale: (locale) => dispatch(changeLocale(locale)),
  };
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
