import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Checkbox,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListSubheader,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    StepConnector,
    TextField,
    Typography,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {
    FaceTwoTone as FaceIcon,
    LinkTwoTone as SyncIcon,
    ArrowBackRounded as BackIcon,
    ArrowForwardRounded as NextIcon,
    LocationOffRounded as LocationOffIcon,
    LocationOnRounded as LocationOnIcon,
    MyLocationRounded as MyLocationIcon,
    InfoTwoTone as InfoIcon,
    SentimentDissatisfiedTwoTone as SadIcon,
} from '@material-ui/icons';

import {
    Marker,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from 'react-google-maps';

import MasterContext from '../../layout/master.context';
import TripService from '../../services/trip.service';
import { Config } from '../../services/config';

import './trip-share.com.less';

class TripShare extends Component {
    constructor() {
        super();
        this.state = {
            trip: {},
            activeStep: 0,
            newProfile: {
                id: undefined,
                name: '',
                color: '',
            },
            allowGeo: undefined,
        };
    }

    static contextType = MasterContext;

    newProfileRef = React.createRef();

    componentDidMount() {
        const {match, location, history} = this.props;
        const {id} = match.params;

        TripService.getTripByShareId(id).then(response => {
            this.setState({
                trip: response,
            });
            const title = (
                <Box>Welcome to <b>{response.name}</b></Box>
            );
            this.context.setTitle(title);
        });
    }

    handleNext() {
        const {activeStep} = this.state;
        this.setState({
            activeStep: activeStep + 1,
        })
    }

    handleBack() {
        let {activeStep, newProfile} = this.state;

        if (activeStep === 1) {
            newProfile.id = undefined;
            newProfile.name = '';
        }

        this.setState({
            activeStep: activeStep - 1,
            newProfile,
        });
    }

    handleLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                allowGeo: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
            });
        }, () => {
            this.setState({
                allowGeo: null,
            });
        });
    }

    handleFinish() {
    }

    handleCheckProfileChange(id) {
        let {newProfile} = this.state;
        newProfile.id = id;

        this.setState({
            newProfile,
        });

        if (id === null) {
            this.newProfileRef.current.focus();
        }
    }

    render() {
        const {trip = {owner: {}, profiles: []}, activeStep, newProfile, allowGeo} = this.state;
        const {profiles = []} = trip;
        const linkedProfiles = profiles.filter(i => true);
        const mapHeight = '100px';
        return (
            <div className="trip-share filled-panel flex-fill">
                <Stepper
                    activeStep={activeStep} orientation="vertical"
                    connector={<StepConnector classes={{line: 'short-line'}}/>}
                >
                    <Step>
                        <StepLabel>
                            You have an invited
                        </StepLabel>
                        <StepContent>
                            {trip.owner &&
                            <Typography variant="body2">Hello, {trip.owner.name} want to invite you
                                join to {trip.name}.</Typography>
                            }
                            {trip.owner &&
                            <Grid container justify="center" alignItems="center" spacing={1} className="my-3">
                                <Avatar alt={trip.owner.name} src={trip.owner.photo}>
                                    {trip.owner.name.slice(0, 1)}
                                </Avatar>
                                <SyncIcon className="mx-2" color="disabled"/>
                                <Avatar>
                                    <FaceIcon/>
                                </Avatar>
                            </Grid>
                            }
                            <Box>
                                <AvatarGroup max={2} className="d-inline-flex">
                                    {linkedProfiles.map(i =>
                                        <Avatar src={i.photo} key={i._id} classes={{root: 'avt-small'}}>
                                            {i.name.slice(0, 1)}
                                        </Avatar>,
                                    )}
                                </AvatarGroup>
                                <Typography variant="caption" className="d-inline">{
                                    `${linkedProfiles.map(i => i.name).slice(0, 2).join(', ')} also joined this group. `
                                }
                                </Typography>
                                <Typography variant="caption" className="d-inline">
                                    If you don't know him, please ignore this invitation.
                                </Typography>
                            </Box>
                            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                                <Button
                                    color="primary"
                                    onClick={this.handleNext.bind(this)}
                                    endIcon={<NextIcon/>}
                                >Next
                                </Button>
                            </Grid>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            Choose your profile
                        </StepLabel>
                        <StepContent>
                            <List className="list" classes={{padding: 'pt-0'}}>
                                <ListSubheader disableSticky>Who are you among those profiles:</ListSubheader>
                                {profiles.map(i => (
                                    <ListItem key={i._id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FaceIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={i.name}
                                        />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                checked={newProfile.id === i._id}
                                                onChange={this.handleCheckProfileChange.bind(this, i._id)}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                <ListSubheader disableSticky>Or create a new one:</ListSubheader>
                                <ListItem classes={{root: 'py-0'}}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FaceIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <TextField
                                            placeholder="Your name is..."
                                            label="Other"
                                            margin="dense"
                                            variant="outlined"
                                            value={newProfile.name}
                                            inputRef={this.newProfileRef}
                                            onChange={
                                                (event) => this.setState({
                                                    newProfile: {id: null, name: event.target.value},
                                                })
                                            }
                                        />
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            checked={newProfile.id === null}
                                            onChange={this.handleCheckProfileChange.bind(this, null)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                                <Grid item>
                                    <Button startIcon={<BackIcon/>} onClick={this.handleBack.bind(this)}>Back</Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        onClick={this.handleNext.bind(this)}
                                        disabled={!newProfile.id && !newProfile.name}
                                        key={`next-step2-${!newProfile.id && !newProfile.name}`}
                                        endIcon={<NextIcon/>}
                                    >Next</Button>
                                </Grid>
                            </Grid>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            Broadcast you
                        </StepLabel>
                        <StepContent>
                            <Typography variant="body2" className="mb-3">Give us your location:</Typography>
                            {trip.owner &&
                            <Grid container justify="center" alignItems="center" spacing={1} className="my-3">
                                <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={
                                        <Avatar className="avt-small for-badge">
                                            <LocationOnIcon style={{fontSize: 12}}/>
                                        </Avatar>
                                    }
                                >
                                    <Avatar alt={trip.owner.name} src={trip.owner.photo}>
                                        {trip.owner.name.slice(0, 1)}
                                    </Avatar>
                                </Badge>
                                <SyncIcon className="mx-2" color="disabled"/>
                                <Avatar>
                                    <LocationOnIcon/>
                                </Avatar>
                            </Grid>
                            }
                            <Box className="mb-3">
                                <InfoIcon style={{fontSize: 14}} color="primary" className="mr-1"/>
                                {allowGeo ?
                                    <Typography variant="caption" className="d-inline">
                                        Current location is on.
                                    </Typography> :
                                    <Typography variant="caption" className="d-inline">
                                        Current location is off, please allow us to trace your location.
                                    </Typography>
                                }
                                &nbsp;
                                <Typography variant="caption" className="d-inline">
                                    You can turn it off later.
                                </Typography>
                            </Box>
                            {allowGeo === null &&
                            <Box className="mb-3">
                                <SadIcon style={{fontSize: 14}} color="primary" className="mr-1"/>
                                <Typography variant="caption" className="d-inline">
                                    You disallowed us.
                                </Typography>
                            </Box>
                            }
                            {allowGeo &&
                            <Box className="mb-3">
                                <MyMap
                                    googleMapURL={Config.mapApi + Config.mapKey}
                                    loadingElement={<div style={{height: mapHeight}}/>}
                                    containerElement={<div style={{height: mapHeight}}/>}
                                    mapElement={<div style={{height: mapHeight}}/>}
                                    defaultCenter={allowGeo}
                                >
                                    <Marker position={allowGeo}/>
                                </MyMap>
                            </Box>
                            }
                            <Grid container justify="space-between" alignItems="center" spacing={1}>
                                <Grid item>
                                    <Button startIcon={<BackIcon/>} onClick={this.handleBack.bind(this)}>Back</Button>
                                </Grid>
                                <Grid item>{allowGeo ?
                                    <Button
                                        variant="contained" color="primary"
                                        onClick={this.handleFinish.bind(this)}
                                    >Finish
                                    </Button> :
                                    <Button
                                        variant="outlined" color="primary"
                                        onClick={this.handleLocation.bind(this)}
                                        endIcon={<MyLocationIcon/>}
                                    >Locating now
                                    </Button>
                                }
                                </Grid>
                            </Grid>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

const MyMap = compose(
    withScriptjs,
    withGoogleMap,
)(props =>
    <GoogleMap
        className={props.className}
        defaultZoom={12}
        defaultCenter={props.defaultCenter}
        defaultOptions={{
            disableDefaultUI: true,
        }}
    >
        {props.children}
    </GoogleMap>,
);

export default withRouter(TripShare);
