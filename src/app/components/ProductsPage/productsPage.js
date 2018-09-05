import React, { Component } from 'react';
import { getProducts } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withWire from '../../hocs/withWire';
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
        products: state.products
    };
};

class ConnectedProductsPage extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount(){
        this.isToken();
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

    // goTo = () => {
    //     return(
    //         <div>
    //             <ul className='links'>
    //                 <li><Link to='/productsPage'>First page</Link></li>
    //                 <li><Link to='/secondPage'>Second page</Link></li>
    //             </ul>
    //         </div>
    //     )
    // };

    render() {
        return (
            <Layout history={this.props.history}>
                <ProductsList/>
            </Layout>
        );
    }
}

const ProductsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedProductsPage);

export default withWire(
    ProductsPage,
    ['httpService', 'authService'],
    (httpService, authService)  => ({ httpService, authService })
);