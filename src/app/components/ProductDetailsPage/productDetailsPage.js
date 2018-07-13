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
            productId: null
        };
        autoBind(this);
    }

    componentWillMount() {
        this.getProductId();
    }

    getProductId() {
        this.setState({
            productId: this.props.history.location.pathname.slice(-1)
        });
    }

    render() {
        console.log(this.state.productId);
        return (
            <Layout history={this.props.history}>
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