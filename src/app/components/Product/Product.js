import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { getProducts } from '../../actions';
import './Product.css';

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
        const { product } = this.props;
        return(
            <div className='product'>
                <h3 className='product__name'>{product.name}</h3>
                <div className='product__image'>
                    <img src={product.image} />
                </div>
                <p className='product__desc'>{product.description}</p>
                <div className='product__details'>
                    <h3 className='product__details-price'>$ {product.cost}</h3>
                    <div className='product__details-btns'>
                        <button className='product__details-btns__delete'>Delete</button>
                        <button className='product__details-btns__details'>Details</button>
                    </div>
                </div>
            </div>
        );
    }
}

const Product = connect(mapStateToProps, mapDispatchToProps)(ConnectedProduct);

export default withWire(
    Product,
    ['httpService'],
    (httpService)  => ({ httpService })
);