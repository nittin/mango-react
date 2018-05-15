import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button,
    Nav, NavItem, NavLink} from 'reactstrap';
import Auth from './../auth/auth';
import './menu.css';

class Menu extends Component {
    render() {
        const menu = [
            {name: 'Home', to: '/home'},
            {name: 'About', to: '/about'},
            {name: 'Contact', to: '/contact'},
            {name: 'Map', to: '/map'},
        ];
        return (
            <div className="menu d-flex">
                <div className="flex-fill d-flex align-items-center">
                    <Nav className="menu-nav">
                        {menu.map((i, index) =>
                            <NavItem key={index}><Link to={i.to} className="nav-link">{i.name}</Link></NavItem>
                        )}
                    </Nav>
                </div>
                <div className="d-flex align-items-center justify-content-around px-2">
                   <Auth/>
                </div>
            </div>
        );
    }
}

export default Menu;
