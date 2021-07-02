import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import MasterContext from './../../layout/master.context';
import {
    MenuOpenTwoTone as MenuOpenTwoToneIcon,
    ArrowBackRounded as ArrowBackIcon,
} from '@material-ui/icons';
import {
    Grid,
    Box,
    IconButton,
} from '@material-ui/core';

import './title.less';

class Title extends Component {
    static contextType = MasterContext;

    backToTrip() {
        const {history} = this.props;
        const {setTitle} = this.context;
        setTitle('');
        history.push('/');
    }

    render() {
        const {title} = this.context;
        let tripDetailHandler = () => (
            <IconButton onClick={this.backToTrip.bind(this)}>
                <MenuOpenTwoToneIcon/>
            </IconButton>
        );
        let tripShareHandler = () => (
            <IconButton onClick={this.backToTrip.bind(this)}>
                <ArrowBackIcon/>
            </IconButton>
        );
        return (
            <div className="title d-flex">
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Box>
                        <Switch>
                            <Route path="/" exact />
                            <Route path="/home" exact />
                            <Route path="/share/:id" component={tripShareHandler}/>
                            <Route path="/:id" component={tripDetailHandler}/>
                        </Switch>
                    </Box>
                    <Box>
                        {title}
                    </Box>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Title);
