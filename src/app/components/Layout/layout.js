import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { Header } from '../Header/';
import { URLS } from '../../consts/apiConsts';
import { getProducts, setLogin, setRole } from '../../actions';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        getProducts: products => dispatch(getProducts(products)),
        setLogin: login => dispatch(setLogin(login)),
        setRole: role => dispatch(setRole(role))
    };
};

const mapStateToProps = state => {
    return {
        products: state.products,
        login: state.login
    };
};

class ConnectedLayout extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount(){
        const { setLogin } = this.props;

        this.getProducts();
        this.getRole();
        setLogin(window.localStorage.login);
    }

    getProducts() {
        const { httpService, getProducts } = this.props;

        httpService.get(URLS.products)
            .then(products => {
                getProducts(products);
            })
            .catch(err => {
                console.log(err);
            });
    }

    getRole() {
        const { httpService, setRole } = this.props;

        httpService.get(URLS.users)
            .then(users => {
                let role = users.filter(user => {
                    return user.login === window.localStorage.login;
                })[0].roleId;
                setRole(role);
        })
    }

    handleLogOut() {
        this.props.authService.logout();
        localStorage.removeItem('login');
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

const Layout = connect(mapStateToProps, mapDispatchToProps)(ConnectedLayout);

export default withWire(
    Layout,
    ['authService', 'httpService'],
    (authService, httpService)  => ({ authService, httpService })
);