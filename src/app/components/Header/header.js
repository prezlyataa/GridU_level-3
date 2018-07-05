import React, { Component } from 'react';
import withWire from '../../hocs/withWire';
import { connect } from 'react-redux';
import './header.css';

const autoBind = require('auto-bind');

const mapStateToProps = state => {
    return {};
};

class ConnectedHeader extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return(
            <div className="header">
                <div className="header-container">
                    <div className="header-container__leftpart">
                        <h3>Logo</h3>
                    </div>
                    <div className="header-container__rightpart">
                        <p className="header-container__rightpart-user">User</p>
                        <div className="header-container__rightpart-btn">
                            <button onClick={this.props.handleLogOut}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Header = connect(mapStateToProps)(ConnectedHeader);

export default withWire(
    Header,
    ['authService'],
    (authService) => ({ authService })
);
