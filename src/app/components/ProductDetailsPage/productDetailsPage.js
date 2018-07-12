import React, { Component } from 'react';
import { getProducts } from '../../actions';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { URLS } from '../../consts/apiConsts';

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

class ConnectedProductDetailsPage extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div>PDD</div>
        );
    }
}

const ProductDetailsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedProductDetailsPage);

export default withWire(
    ProductDetailsPage,
    ['httpService'],
    (httpService)  => ({ httpService })
);