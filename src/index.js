import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Master from "./layout/master";
import Home from "./pages/home";
import TripCom from "./pages/trip/trip.com";
import TripDetail from "./pages/trip-detail/trip-detail.com";
import TripShare from "./pages/trip-share/trip-share.com";

const app = (

    <Router>
        <Master>
            <Switch>
                <Route path="/" exact component={TripCom}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/share/:id" component={TripShare}/>
                <Route path="/:id" component={TripDetail}/>
            </Switch>
        </Master>
    </Router>

);
ReactDOM.render(app, document.getElementById('root'), function () {
    console.timeEnd('react-main');
});
registerServiceWorker();
