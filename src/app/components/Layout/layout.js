import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { Header } from '../Header/'

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
                <Header handleLogOut={this.handleLogOut} />
                {this.props.children}
            </div>
        );
    }
}

const Layout = connect(mapStateToProps)(ConnectedLayout);

export default withWire(
    Layout,
    ['authService'],
    (authService)  => ({ authService })
);