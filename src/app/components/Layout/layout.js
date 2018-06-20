import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {};
};

const mapStateToProps = state => {
    return {};
};

class ConnectedLayout extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleLogOut() {
        this.props.authService.logout();
        this.props.history.replace('/');
    }

    render() {
        return(
            <div>
                <div className="header">
                    Header
                    <button onClick={this.handleLogOut}>Logout</button>
                </div>
                {this.props.children}
                <div className="footer">
                    Footer
                </div>
            </div>
        );
    }
}

const Layout = connect(mapStateToProps)(ConnectedLayout);

export default withWire(
    Layout,
    ['httpService', 'authService'],
    (httpService, authService)  => ({ httpService, authService })
);