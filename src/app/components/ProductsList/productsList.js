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
            visible: 5
        };
        autoBind(this);
    }

    loadMore() {
        this.setState({
            visible: this.state.visible + 5
        });
    }

    render() {
        const { products } = this.props;
        return(
            <div>
                <div className='products_list'>
                    {products.slice(0, this.state.visible).map((product, id) => (
                        <Product key={id} product={product}/>
                    ))}
                </div>
                <div className='load_more'>
                    {this.state.visible < products.length &&
                     <button onClick={ this.loadMore } type="button" >Load more</button>
                    }
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