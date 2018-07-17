import React, { Component } from 'react';
import { getProducts } from '../../actions';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { Layout } from '../Layout';
import { URLS } from '../../consts/apiConsts';
import StarRatingComponent from 'react-star-rating-component';
import './productDetailsPage.css';

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
            currentProduct: {},
            productCategory: ''
        };
        autoBind(this);
    }

    componentDidMount() {
        this.getCurrentProduct();
    }

    getCurrentProduct() {
        const { httpService } = this.props;

        httpService.get(URLS.products)
            .then(products => {
                let ID = this.props.history.location.pathname.match(/[^/]+$/)[0];

                let product = products.filter(product => {
                    return product.id === parseInt(ID, 10);
                });

                this.setState({
                    currentProduct: product[0]
                });
            })
            .then(() => {
                httpService.get(URLS.categories)
                    .then(categories => {
                        let productCategory = categories.filter(category => {
                            return category.id === parseInt(this.state.currentProduct.categoryId, 10);
                        });

                        this.setState({
                            productCategory: productCategory[0].name
                        });
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    goBack() {
        this.props.history.replace('/productsPage');
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({
            rating: nextValue
        });
    }

    render() {
        const { currentProduct, productCategory } = this.state;
        return (
            <Layout history={this.props.history}>
                <div className='btn_back'>
                    <button onClick={this.goBack}>Back</button>
                </div>
                <div className='details'>
                    <div className='details__leftpart'>
                        <div className='details__leftpart-img'>
                            <img src={currentProduct.image} alt='img'/>
                        </div>
                        <div className='details__leftpart-rate'>
                            <StarRatingComponent
                                className='details__leftpart-rate__stars'
                                name='rate'
                                starCount={5}
                                value={currentProduct.rating}
                                editing={false}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                        <div className='details__leftpart-info'>
                            <p className='details__leftpart-info__price'>
                                $ {currentProduct.cost}
                            </p>
                            <p className='details__leftpart-info__gender'>
                                Gender: {currentProduct.gender}
                            </p>
                            <p className='details__leftpart-info__category'>
                                Category: {productCategory}
                            </p>
                        </div>
                    </div>
                    <div className='details__rightpart'>
                        <div className='details__rightpart-desc'>
                            <h3>{currentProduct.name}</h3>
                            <p>{currentProduct.description}</p>
                        </div>
                    </div>
                </div>
                <div className="btn_buy">
                    <button>Buy</button>
                </div>
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