import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Master from "./layout/master";
import Home from "./pages/home";
import About from "./pages/about";
import Map from "./pages/map";

const app = (

    <Router>
        <Master>
            <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/home"/>
                )}/>
                <Route path="/home" component={Home}/>
                <Route path="/about/:id" component={About}/>
                <Route path="/map" component={Map}/>
            </Switch>
        </Master>
    </Router>

);
ReactDOM.render(app, document.getElementById('root'), function () {
    console.timeEnd('react-main');
});
registerServiceWorker();
