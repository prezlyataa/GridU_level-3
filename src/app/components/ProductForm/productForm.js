import React, { Component } from 'react';
import withWire from '../../hocs/withWire';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getProducts } from '../../actions';
import { URLS } from "../../consts/apiConsts";

const mapDispatchToProps = dispatch => {
    return {
        getProducts: products => dispatch(getProducts(products))
    };
};

const mapStateToProps = state => {
    return {
        products: state.products,
    };
};

class ConnectedProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: '',
            cost: '',
            count: '',
            description: '',
            gender: '',
            image: "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb",
            name: '',
            rating: '',
            soldCount: '',
            newProduct: {}
        }
    }

    handleChangeName = event => {
        this.setState({
            name: event.target.value
        });
    };

    handleChangeDesc = event => {
        this.setState({
            desc: event.target.value
        });
    };

    handleChangeCost = event => {
        this.setState({
            cost: event.target.value
        })
    };

    handleChangeRating = event => {
        this.setState({
            rating: event.target.value
        })
    };

    handleChangeSoldCount = event => {
        this.setState({
            soldCount: event.target.value
        })
    };

    handleChangeCount = event => {
        this.setState({
            count: event.target.value
        })
    };

    createNewProduct = (event) => {
        const { newProduct, name, desc,cost, rating, soldCount, count, image } = this.state;
        const { httpService, getProducts } = this.props;

        event.preventDefault();

        newProduct.name = name;
        newProduct.desc = desc;
        newProduct.cost = parseInt(cost, 10);
        newProduct.rating = parseInt(rating, 10);
        newProduct.soldCount = parseInt(soldCount, 10);
        newProduct.count = parseInt(count, 10);
        newProduct.image = image;

        httpService
            .post(URLS.products, newProduct)
            .then(() => {
                httpService
                    .get(URLS.products)
                    .then(products => {
                        getProducts(products);
                    })
            });

        this.props.onClose();
    };

    render() {
        const { newProduct, name, desc, cost, rating, soldCount, count } = this.state;
        return (
          <div className='product-form'>
              <input id='name' type="text" placeholder='Name' value={name} onChange={this.handleChangeName}/>
              <textarea id="desc" placeholder='Description' value={desc} onChange={this.handleChangeDesc} />
              <input id='cost' type="number" placeholder='Price' value={cost} onChange={this.handleChangeCost}/>
              <input id='rating' type="number" placeholder='Rating' value={rating} onChange={this.handleChangeRating}/>
              <input id='soldCount' type="number" placeholder='Sold count' value={soldCount} onChange={this.handleChangeSoldCount}/>
              <input id='count' type="number" placeholder='Count' value={count} onChange={this.handleChangeCount}/>
              <button onClick={this.createNewProduct}>Create</button>
          </div>
        );
    }
}

const ProductForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedProductForm);

export default withWire(
    ProductForm,
    ['httpService'],
    (httpService)  => ({ httpService })
);