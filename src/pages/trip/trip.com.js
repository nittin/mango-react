import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    IconButton,
} from '@material-ui/core';
import {
    BeachAccessTwoTone as BeachAccessIcon,
    LinkTwoTone as LinkTwoToneIcon,
} from '@material-ui/icons';

import TripService from '../../services/trip.service';
import './trip.com.less';

class Trip extends Component {
    constructor() {
        super();
        this.state = {
            trips: [],
        };
    }

    componentDidMount() {
        TripService.getTrips().then(response => {
            this.setState({
                trips: response,
            });
        });
    }

    goToDetail(id) {
        const { match, location, history } = this.props;
        history.push(`/${id}`);
    }

    copyToShare(key) {
        const url = `${window.location.href}share/${key}`;
        navigator.clipboard.writeText(url);
    }

    render() {
        const {trips} = this.state;
        return (
            <div className="trips">
                <List className="list p-3">
                    {trips.map(i => (
                        <ListItem
                            key={i._id}
                            button
                            classes={{container: 'list-group-item'}}
                            onClick={this.goToDetail.bind(this, i._id)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={i.name}
                                secondary={`${i.date}: ${i.profiles.length} members`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={this.copyToShare.bind(this, i.shared_key)}>
                                    <LinkTwoToneIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default withRouter(Trip);
