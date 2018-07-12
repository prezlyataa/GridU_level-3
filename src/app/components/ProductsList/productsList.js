import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Product } from '../Product';
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

class ConnectedProductsList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    render() {
        const { products } = this.props;
        return(
            <div>
                <h3>Products List</h3>
                <Product/>
                <div>
                    {products.map((product, id) => (
                        <div key={id}>{product.name}</div>
                    ))}
                </div>
            </div>
        );
    }
}

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ConnectedProductsList);

export default withWire(
    ProductsList,
    ['httpService'],
    (httpService)  => ({ httpService })
);