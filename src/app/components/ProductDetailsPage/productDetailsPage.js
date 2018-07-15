import React, { Component } from 'react';
import { getProducts } from '../../actions';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { Layout } from '../Layout';
import { URLS } from '../../consts/apiConsts';

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

class ConnectedProductDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: {}
        };
        autoBind(this);
    }

    componentDidMount() {
        this.getCurrentProduct();
    }

    getCurrentProduct() {
        let ID = this.props.history.location.pathname.match(/[^\/]+$/)[0];

        const { products } = this.props;
        let product = products.filter(product => {
            return product.id === parseInt(ID);
        });

        this.setState({
            currentProduct: product[0]
        });
    }

    goBack() {
        this.props.history.replace('/productsPage');
    }

    render() {
        console.log(this.state.currentProduct);
        return (
            <Layout history={this.props.history}>
                <button onClick={this.goBack}>Back</button>
                <div>PDD</div>
            </Layout>
        );
    }
}

const ProductDetailsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedProductDetailsPage);

export default withWire(
    ProductDetailsPage,
    ['httpService'],
    (httpService)  => ({ httpService })
);