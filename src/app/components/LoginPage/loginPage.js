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
        this.state = {
            login: null,
            password: null
        };
        autoBind(this);
    }

    // componentWillMount(){
    //     const { authService } = this.props;
    //     if(!authService.loggedIn()) {
    //         this.props.history.replace('/firstPage')
    //     }
    // }

    handleChangeLogin(e) {
        this.setState({
            login: e.target.value
        });
    }

    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleFormSubmit(e){
        const { authService } = this.props;
        const { login, password } = this.state;
        e.preventDefault();

        authService.login(login, password)
            .then(() => {
                this.props.history.replace('/firstPage');
            })
            .catch(err => {
                alert(err);
            })
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="form-item"
                            placeholder="Login"
                            name="username"
                            type="text"
                            onChange={this.handleChangeLogin}
                            required
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChangePassword}
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