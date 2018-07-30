import React, { Component } from 'react';
import withWire from '../../hocs/withWire';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getProducts } from '../../actions';
import { URLS } from "../../consts/apiConsts";
import './productForm.css';

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
            cost: '',
            count: '',
            description: '',
            image: "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb",
            name: '',
            soldCount: '',
            gender: 'Man',
            categoryId: 0,
            rating: 0,
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

    handleChangeGender = event => {
        this.setState({
            gender: event.target.value
        })
    };

    handleChangeCategory = event => {
        this.setState({
            categoryId: parseInt(event.target.value, 10)
        })
    };

    handleChangeRating = event => {
        this.setState({
            rating: parseInt(event.target.value, 10)
        })
    };

    createNewProduct = (event) => {
        const { newProduct, name, desc, cost, soldCount, count, image, gender, categoryId, rating } = this.state;
        const { httpService, getProducts } = this.props;

        event.preventDefault();

        newProduct.name = name;
        newProduct.desc = desc;
        newProduct.cost = parseInt(cost, 10);
        newProduct.rating = parseInt(rating, 10);
        newProduct.soldCount = parseInt(soldCount, 10);
        newProduct.count = parseInt(count, 10);
        newProduct.image = image;
        newProduct.gender = gender;
        newProduct.categoryId = categoryId;
        newProduct.rating = rating;

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
        const { name, desc, cost, rating, soldCount, count } = this.state;
        return (
          <div className='product-form'>
              <div className='product-form__title'>
                  <h3>Fill the fields</h3>
              </div>
              <div className='product-form__name'>
                  <input id='name' type="text" placeholder='Name' value={name} onChange={this.handleChangeName}/>
              </div>
              <div className='product-form__desc'>
                  <textarea id="desc" placeholder='Description' value={desc} onChange={this.handleChangeDesc} />
              </div>
              <div className='product-form__price'>
                  <input id='cost' type="number" placeholder='Price' value={cost} onChange={this.handleChangeCost}/>
              </div>
              <div className='product-form__rating'>
                  <input id='rating' type="number" placeholder='Rating' value={rating} onChange={this.handleChangeRating}/>
              </div>
              <div className='product-form__soldCount'>
                  <input id='soldCount' type="number" placeholder='Sold count' value={soldCount} onChange={this.handleChangeSoldCount}/>
              </div>
              <div className='product-form__count'>
                  <input id='count' type="number" placeholder='Count' value={count} onChange={this.handleChangeCount}/>
              </div>
              <div className='product-form__gender'>
                  <select onChange={this.handleChangeGender}>
                      <option value="Man">Man</option>
                      <option value="Woman">Woman</option>
                      <option value="Unisex">Unisex</option>
                  </select>
              </div>
              <div className='product-form__categoryId'>
                  <select onChange={this.handleChangeCategory}>
                      <option value="0">Active wear</option>
                      <option value="1">Jeans</option>
                      <option value="2">Coats</option>
                      <option value="3">Sweaters</option>
                      <option value="4">Wear to work</option>
                  </select>
              </div>
              <div className='product-form__rating'>
                  <select onChange={this.handleChangeRating}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>
              </div>
              <div className='product-form__btn'>
                  <button onClick={this.createNewProduct}>Create</button>
              </div>
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