import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
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

class ConnectedProduct extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    render() {
        return(
            <div>Product</div>
        );
    }
}

const Product = connect(mapStateToProps, mapDispatchToProps)(ConnectedProduct);

export default withWire(
    Product,
    ['httpService'],
    (httpService)  => ({ httpService })
);