import './menu.less';
import React, {Component} from 'react';
import Auth from './../auth/auth';
import Title from './../title/title';


class Menu extends Component {
    render() {
        return (
            <div className="menu d-flex">
                <div className="flex-fill d-flex align-items-center">
                    <Title/>
                </div>
                <div className="d-flex align-items-center justify-content-around px-2">
                   <Auth/>
                </div>
            </div>
        );
    }
}

export default Menu;
