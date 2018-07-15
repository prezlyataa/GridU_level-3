import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { Header } from '../Header/';
import { URLS } from '../../consts/apiConsts';
import { getProducts } from '../../actions';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        getProducts: products => dispatch(getProducts(products))
    };
};

const mapStateToProps = state => {
    return {
        products: state.products
    };
};

class ConnectedLayout extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount(){
        const { httpService, getProducts } = this.props;

        httpService.get(URLS.products)
            .then(products => {
                getProducts(products);
            })
            .catch(err => {
                console.log(err);
            });
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

const Layout = connect(mapStateToProps, mapDispatchToProps)(ConnectedLayout);

export default withWire(
    Layout,
    ['authService', 'httpService'],
    (authService, httpService)  => ({ authService, httpService })
);