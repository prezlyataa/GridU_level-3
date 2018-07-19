import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Product } from '../Product';
import withWire from '../../hocs/withWire';
import { getProducts, loadMore } from '../../actions';
import './productList.css';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        getProducts: products => dispatch(getProducts(products)),
        loadMore: (num) => dispatch(loadMore(num))
    };
};

const mapStateToProps = state => {
    return {
        products: state.products,
        visibleProducts: state.visibleProducts
    };
};

class ConnectedProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredProducts: [],
            clearFilter: false,
            visible: 6,
            available: false,
            gender: null,
            rate: null,
            from: null,
            to: null
        };
        autoBind(this);
    }

    load_More() {
        this.setState({
            visible: this.state.visible + 6
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
            arrOfRefs = [],
            rate,
            from,
            to;

        arrOfRefs.push(ref1, ref2, ref3, ref4);
        arrOfRefs.forEach(ref => {
            this.refs[ref].checked = false;
        });

        rate = document.getElementById('rate');
        rate.value = '';
        from = document.getElementById('from');
        from.value = '';
        to = document.getElementById('to');
        to.value = '';
    }

    setGender(e) {
        this.setState({
            gender: e.currentTarget.value
        });
    }

    setRate(e) {
        e.preventDefault();
        this.setState({
            rate: e.target.value
        });
    }

    setPriceFrom(e) {
        e.preventDefault();
        this.setState({
            from: e.target.value
        });
    }

    setPriceTo(e) {
        e.preventDefault();
        this.setState({
            to: e.target.value
        });
    }


    filterProducts() {
        const { available, gender, rate, from, to } = this.state;
        const { products } = this.props;
        let filteredProducts;

        // filteredProducts = products.filter(product => {
        //     return (
        //         (available === true) ? product.count > 0 &&
        //             (gender !== null ) ? product.gender === gender &&
        //                 (rate !== null ) ? product.rating === parseInt(rate, 10)
        //     );
        // });
        //
        // if (available) {
        //     filteredProducts = products.filter(product => {
        //         return product.count > 0;
        //     });
        // }
        // if (gender !== null) {
        //     filteredProducts = products.filter(product => {
        //         return product.gender === gender;
        //     });
        // }
        // if (rate !== null) {
        //     filteredProducts = products.filter(product => {
        //         return product.rating === parseInt(rate, 10);
        //     });
        // }

        // if (from !== null) {
        //     filteredProducts = products.filter(product => {
        //         return product.cost > parseInt(from, 10);
        //     });
        // }
        //
        // if (to !== null) {
        //     filteredProducts = products.filter(product => {
        //         return product.cost < parseInt(to, 10);
        //     });
        // }
        //
        // if (from !== null && to !== null) {
        //     filteredProducts = products.filter(product => {
        //         return (product.cost > parseInt(from, 10) && product.cost < parseInt(to, 10));
        //     });
        // }

        this.setState({
            filteredProducts: filteredProducts,
            clearFilter: false
        });
    }

    resetFilter() {
        this.setState({
            available: false,
            clearFilter: true,
            visible: 6,
            gender: null,
            rate: null,
            from: null,
            to: null
        });

        this.unCheck();
    }

    renderList() {
        const { products } = this.props;
        const { filteredProducts, clearFilter, visible } = this.state;

        if (filteredProducts.length > 0 && !clearFilter) {
            return filteredProducts.slice(0, visible).map((product, id) => (
                <Product key={id} product={product}/>
            ));
        } else {
            return products.slice(0, visible).map((product, id) => (
                <Product key={id} product={product}/>
            ));
        }
    }

    renderLoadMore() {
        const { products } = this.props;
        const { filteredProducts, visible, clearFilter } = this.state;

        if (filteredProducts.length > 0 && !clearFilter) {
            if (visible < filteredProducts.length) {
                return <button onClick={ this.load_More } type="button" >Load more</button>
            }
        } else {
            if (visible < products.length) {
                return <button onClick={ this.load_More } type="button" >Load more</button>
            }
        }
    }

    render() {
        console.table(this.state);
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
                            </label>
                            <label><input
                                type="radio"
                                name='gender-checkbox'
                                onChange={this.setGender}
                                value='Woman'
                                ref={'woman-radio'}
                                />
                                Female
                            </label>
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
                        <div className='filter__top-rate'>
                            Rating: <input
                            type='number'
                            placeholder='input rate from 1-5'
                            id='rate'
                            onChange={this.setRate}
                        />
                        </div>
                    </div>
                    <div className='filter__bottom'>
                        <div className='filter__bottom-price'>
                            Price:
                            <input
                                type="number"
                                id='from'
                                placeholder='from'
                                onChange={this.setPriceFrom}
                            />
                            <input
                                type="number"
                                id='to'
                                placeholder='to'
                                onChange={this.setPriceTo}
                            />
                        </div>
                        <div className='filter__bottom-btns'>
                            <button className='filter__bottom-btns__clear' onClick={ this.resetFilter }>Clear</button>
                            <button className='filter__bottom-btns__apply' onClick={ this.filterProducts }>Apply</button>
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