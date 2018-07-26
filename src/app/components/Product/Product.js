import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { getProducts } from '../../actions';
import { Link } from 'react-router-dom';
import { URLS } from '../../consts/apiConsts';
import axios from 'axios';
import './Product.css';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        getProducts: products => dispatch(getProducts(products))
    };
};

const mapStateToProps = state => {
    return {
        products: state.products,
        role: state.role
    };
};

class ConnectedProduct extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    deleteProduct() {
        const { httpService, product } = this.props;

        axios
            .delete(`${URLS.products}/${product.id}`)
            .then(() => {
                httpService.get(URLS.products)
                    .then(products => {
                        this.props.getProducts(products);
                    })
            })
    }

    render() {
        const { product } = this.props;
        return(
            <div className='product'>
                <h3 className='product__name'>{product.name}</h3>
                <div className='product__image'>
                    <img src={product.image} alt='img'/>
                </div>
                <p className='product__desc'>{product.description}</p>
                <div className='product__details'>
                    <h3 className='product__details-price'>$ {product.cost}</h3>
                    <div className='product__details-btns'>
                        { this.props.role == true && <button className='product__details-btns__delete' onClick={this.deleteProduct}>Delete</button> }
                        <button className='product__details-btns__details'>
                            <Link to={{ pathname: `productDetailsPage/${product.id}`, state: { product } }}>Details</Link>
                        </button>
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