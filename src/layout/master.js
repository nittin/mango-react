import React, {Component} from 'react';
import Menu from './../core/menu/menu'
import './master.css';

class Master extends Component {
    render() {
        return (
            <div className="App">
                <Menu />
                {this.props.children}
            </div>
        );
    }
}

export default Master;
