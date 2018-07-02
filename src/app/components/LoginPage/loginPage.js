import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import classnames from 'classnames';
import { URLS } from '../../consts/apiConsts';
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
            password: ''
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
        const { authService, httpService } = this.props;
        const { login, password } = this.state;
        e.preventDefault();

        authService.login(login, password)
            .then(() => {
                if(authService.getToken()) {
                    this.props.history.replace('/firstPage');
                } else {
                    alert('Wrong login or password');
                }
            })
            .catch(err => {
                alert('Wrong login or password');
                alert(err);
            });
    }

    render() {
        const inputLoginClass = classnames({
            'form-item': true,
            'invalid': this.state.login.length < 3
        });
        const inputPasswordClass = classnames({
            'form-item': true,
            'invalid': this.state.password.length < 3
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
    ['authService', 'httpService'],
    (authService, httpService)  => ({ authService, httpService })
);