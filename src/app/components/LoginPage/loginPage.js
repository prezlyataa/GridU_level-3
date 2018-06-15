import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import './loginPage.css';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {};
};

const mapStateToProps = state => {
    return { persons: state.persons };
};

class ConnectedLoginPage extends Component {
    constructor(props){
        super(props);
        autoBind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="Username"
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-submit"
                            value="Submit"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPage);

export default withWire(
    LoginPage,
    ['authService'],
    authService  => ({ authService })
);