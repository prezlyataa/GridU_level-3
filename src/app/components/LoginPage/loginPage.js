import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import classnames from 'classnames';
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
            login: '',
            password: '',
            isValid: true
        };
        autoBind(this);
    }

    componentWillMount(){
        const { authService } = this.props;
        if(authService.getToken()) {
            this.props.history.replace('/productsPage')
        }
    }

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
                if(authService.getToken()) {
                    this.props.history.replace('/productsPage');
                } else {
                    this.setState({
                        isValid: false
                    });
                }
            })
            .catch(err => {
                alert('Wrong login or password');
                alert(err);
            });
    }

    render() {
        const { login, password, isValid } = this.state;
        const inputLoginClass = classnames({
            'form-item': true,
            'invalid': login.length >= 1,
            'valid': login.length > 3
        });
        const inputPasswordClass = classnames({
            'form-item': true,
            'invalid': password.length >= 1,
            'valid': password.length > 3
        });
        const btnSubmit = classnames({
            'form-submit': true,
            'disabled': login.length < 3 || password.length < 3
        });
        const warning = classnames({
            'warning': true,
            'show': !isValid
        });

        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className={ inputLoginClass }
                            placeholder="Login"
                            name="username"
                            type="text"
                            onChange={this.handleChangeLogin}
                            minLength="3"
                            required
                        />
                        <input
                            className={ inputPasswordClass }
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChangePassword}
                            minLength="3"
                            required
                        />
                        <input
                            className={ btnSubmit }
                            value="Submit"
                            type="submit"
                        />
                        <p className={ warning }>Wrong login or password!</p>
                    </form>
                </div>
            </div>
        )
    }
}

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPage);

export default withWire(
    LoginPage,
    ['authService', 'httpService'],
    (authService, httpService)  => ({ authService, httpService })
);