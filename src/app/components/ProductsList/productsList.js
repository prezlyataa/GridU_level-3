import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Product } from '../Product';
import withWire from '../../hocs/withWire';
import { getProducts, loadMore, searchProducts } from '../../actions';
import { URLS } from "../../consts/apiConsts";
import './productList.css';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        getProducts: products => dispatch(getProducts(products)),
        loadMore: num => dispatch(loadMore(num)),
        searchProducts: query => dispatch(searchProducts(query))
    };
};

const mapStateToProps = state => {
    return {
        products: state.products,
        visibleProducts: state.visibleProducts,
        login: state.login,
        role: state.role
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
            to: null,
            invalidGender: false,
            invalidRate: false,
            openFilter: false,
            query: ''
        };
        autoBind(this);
    }

    load_More() {
        this.setState({
            visible: this.state.visible + 6
        });
    }

    filterToggle() {
        this.setState({
            openFilter: !this.state.openFilter
        })
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

        let filterItems = (items, available, gender, rate, from, to) => {
            if (available !== true) {
                available = 0;
            }
            from = from || 0;
            to = to || 100000;
            let filteredItem;

            filteredItem = items.filter(item => {
                return (
                    item.count >= available &&
                    item.gender === gender &&
                    item.rating === parseInt(rate, 10) &&
                    item.cost > parseInt(from, 10) &&
                    item.cost < parseInt(to, 10)
                );
            });

            return filteredItem;
        };

        if (gender === null && rate !== null) {
            this.setState({
                invalidGender: true
            })
        } else if (rate === null && gender !== null) {
            this.setState({
                invalidRate: true
            })
        } else {
            this.setState({
                invalidRate: true,
                invalidGender: true
            })
        }

        if(gender !== null && rate !== null) {
            filteredProducts = filterItems(products, available, gender, rate, from, to);

            this.setState({
                filteredProducts: filteredProducts,
                clearFilter: false,
                invalidGender: false,
                invalidRate: false
            });
        }
    }

    resetFilter() {
        this.setState({
            available: false,
            clearFilter: true,
            visible: 6,
            gender: null,
            rate: null,
            from: null,
            to: null,
            invalidGender: false,
            invalidRate: false
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
        // return products.map((product, id) => (
        //     <Product key={id} product={product}/>
        // ));
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

    filterList(e){
        const { httpService, getProducts, searchProducts } = this.props;
        this.setState({
            query: e.target.value
        });
        if(e.target.value.length < 1) {
            httpService.get(URLS.products)
                .then(products => {
                    getProducts(products);
                })
        }
        searchProducts(e.target.value);
    }

    render() {
        const genderLabel = classnames({
            'danger-gender': this.state.invalidGender
        });

        const rateLabel = classnames({
            'danger-rate': this.state.invalidRate
        });

        const filter = classnames({
            'filter': true,
            'open': this.state.openFilter
        });

        return(
            <div>
                <div>
                    <button className='filter-btn' onClick={this.filterToggle}>Filter</button>
                </div>
                <div className={filter}>
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
                            <label className={genderLabel}><input
                                type="radio"
                                name='gender-checkbox'
                                onChange={this.setGender}
                                value='Man'
                                ref={'man-radio'}
                                />
                                Male
                            </label>
                            <label className={genderLabel}><input
                                type="radio"
                                name='gender-checkbox'
                                onChange={this.setGender}
                                value='Woman'
                                ref={'woman-radio'}
                                />
                                Female
                            </label>
                            <label className={genderLabel}><input
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
                            <label className={rateLabel}>Rating: </label><input
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
                <div className='search-field'>
                    <input type='text' placeholder='Search product' onChange={this.filterList} value={this.state.query}/>
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