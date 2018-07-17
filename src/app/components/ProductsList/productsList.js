import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Product } from '../Product';
import withWire from '../../hocs/withWire';
import { getProducts } from '../../actions';
import './productList.css';

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
        this.state = {
            filteredProducts: [],
            clearFilter: false,
            visible: 5,
            available: false,
            gender: null
        };
        autoBind(this);
    }

    loadMore() {
        this.setState({
            visible: this.state.visible + 5
        });
    }

    availableCheck() {
        const { available } = this.state;
        this.setState({
            available: !available
        });
    }

    unCheck(){
        let ref1 = 'checkbox',
            ref2 = 'man-radio',
            ref3 = 'woman-radio',
            ref4 = 'unisex-radio',
            arrOfRefs = [];

        arrOfRefs.push(ref1, ref2, ref3, ref4);
        arrOfRefs.forEach(ref => {
            this.refs[ref].checked = false;
        });
    }

    setGender(e) {
        this.setState({
            gender: e.currentTarget.value
        });
    }

    filterProducts() {
        const { available, gender } = this.state;
        const { products } = this.props;
        let filteredProducts = [];

        if (available) {
            filteredProducts = products.filter(product => {
                return product.count > 0;
            });
        }
        if (gender !== null) {
            filteredProducts = products.filter(product => {
                return product.gender === gender;
            });
        }
        this.setState({
            filteredProducts: filteredProducts,
            clearFilter: false
        });
    }

    resetFilter() {
        this.setState({
            available: false,
            clearFilter: true,
            visible: 5,
            gender: null
        });

        this.unCheck();
    }

    renderList() {
        const { products } = this.props;
        const { filteredProducts, clearFilter } = this.state;

        if (filteredProducts.length > 0 && !clearFilter) {
            return filteredProducts.slice(0, this.state.visible).map((product, id) => (
                <Product key={id} product={product}/>
            ));
        } else {
            return products.slice(0, this.state.visible).map((product, id) => (
                <Product key={id} product={product}/>
            ));
        }
    }

    renderLoadMore() {
        const { products } = this.props;
        const { filteredProducts, visible, clearFilter } = this.state;

        if (filteredProducts.length > 0 && !clearFilter) {
            if (visible < filteredProducts.length) {
                return <button onClick={ this.loadMore } type="button" >Load more</button>
            }
        } else {
            if (visible < products.length) {
                return <button onClick={ this.loadMore } type="button" >Load more</button>
            }
        }
    }

    render() {
        console.log(this.state);
        return(
            <div>
                <div className='filter'>
                    <div className='filter__top'>
                        <div className='filter__top-available'>
                            <label>
                                <input
                                    type="checkbox"
                                    onClick={ this.availableCheck }
                                    ref={'checkbox'}
                                />
                                Available only
                            </label>
                        </div>
                        <div className='filter__top-gender'>
                            <label><input
                                type="radio"
                                name='gender-checkbox'
                                onChange={this.setGender}
                                value='Man'
                                ref={'man-radio'}
                                />
                                Male
                            </label><br/>
                            <label><input
                                type="radio"
                                name='gender-checkbox'
                                onChange={this.setGender}
                                value='Woman'
                                ref={'woman-radio'}
                                />
                                Female
                            </label><br/>
                            <label><input
                                type="radio"
                                name='gender-checkbox'
                                onChange={this.setGender}
                                value='Unisex'
                                ref={'unisex-radio'}
                                />
                                Unisex
                            </label>
                        </div>
                    </div>
                    <div className='filter__bottom'>
                        <div className='filter__bottom-btns'>
                            <button onClick={ this.resetFilter }>Clear</button>
                            <button onClick={ this.filterProducts }>Apply</button>
                        </div>
                    </div>
                </div>
                <div className='products_list'>
                    { this.renderList() }
                </div>
                <div className='load_more'>
                    { this.renderLoadMore() }
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