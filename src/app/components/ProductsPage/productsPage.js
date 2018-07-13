import React, { Component } from 'react';
import { getProducts } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withWire from '../../hocs/withWire';
import { URLS } from '../../consts/apiConsts';
import { Layout } from '../Layout';
import { ProductsList } from '../ProductsList';
import './productsPage.css';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        getProducts: products => dispatch(getProducts(products))
    };
};

const mapStateToProps = state => {
    return {
        products: state. products
    };
};

class ConnectedFirstPage extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillUpdate() {
        window.addEventListener('isToken', this.isToken);
    }

    componentWillMount(){
        const { httpService, getProducts } = this.props;
        this.isToken();
        httpService.get(URLS.products)
            .then(products => {
                getProducts(products);
            })
            .catch(err => {
                console.log(err);
            });
    }

    isToken() {
        const { authService } = this.props;
        if(!authService.getToken()) {
            this.props.history.replace('/');
        }
    }

    handleLogOut() {
        this.props.authService.logout();
        this.props.history.replace('/');
    }

    render() {
        return (
            <Layout history={this.props.history}>
                <ProductsList/>
                <div>
                    <ul className='links'>
                        <li><Link to='/productsPage'>First page</Link></li>
                        <li><Link to='/secondPage'>Second page</Link></li>
                    </ul>
                </div>
            </Layout>
        );
    }
}

const ProductsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedFirstPage);

export default withWire(
    ProductsPage,
    ['httpService', 'authService'],
    (httpService, authService)  => ({ httpService, authService })
);