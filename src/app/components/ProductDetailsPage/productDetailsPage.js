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
        products: state.products,
        role: state.role
    };
};

class ConnectedProductDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: {},
            productCategory: '',
            productCategoryId: null,
            editing: false
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
                    return parseInt(product.id, 10) === parseInt(ID, 10);
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
                            productCategory: productCategory[0].name,
                            productCategoryId: productCategory[0].id
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

    renderProductDetails = () => {
       const { currentProduct, productCategory } = this.state;

       return (
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
       );
    };

    editToggle() {
        this.setState({
            editing: !this.state.editing
        });
    }

    renderEditTemplate() {
        const { currentProduct, productCategoryId } = this.state;
        console.log(currentProduct);

        return (
            <div>
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
                                Price: <input id='editPrice' type="number" defaultValue={currentProduct.cost}/>
                            </p>
                            <select id='editGender' defaultValue={currentProduct.gender}>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            <select id='editCategory' defaultValue={productCategoryId}>
                                <option value="0">Active wear</option>
                                <option value="1">Jeans</option>
                                <option value="2">Coats</option>
                                <option value="3">Sweaters</option>
                                <option value="4">Wear to work</option>
                            </select>
                        </div>
                    </div>
                    <div className='details__rightpart'>
                        <div className='details__rightpart-desc'>
                            <div className='editName'>
                                <p>Name: </p>
                                <input id='editName' type="text" defaultValue={currentProduct.name}/>
                            </div>
                            <div>
                                <p>Description:</p>
                                <textarea id='editDesc' rows="20" cols="70" defaultValue={currentProduct.description}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-edit-btns'>
                    <button className='bottom-edit-btns__save' onClick={this.setEditValue}>Save</button>
                    <button className='bottom-edit-btns__cancel' onClick={this.editToggle}>Cancel</button>
                </div>
            </div>
        );
    }

    setEditValue() {
        const { currentProduct, editing } = this.state;
        const { httpService } = this.props;
        let newPrice = document.getElementById('editPrice').value,
            newGender = document.getElementById('editGender').value,
            newCategory = document.getElementById('editCategory'),
            newName = document.getElementById('editName').value,
            newDesc = document.getElementById('editDesc').value;

        let editedProduct = currentProduct;
        editedProduct.name = newName;
        editedProduct.description = newDesc;
        editedProduct.gender = newGender;
        editedProduct.cost = parseFloat(newPrice, 10);
        editedProduct.categoryId = parseInt(newCategory.options[newCategory.selectedIndex].value, 10);

        httpService.get(URLS.categories)
            .then(categories => {
                let productCategory = categories.filter(category => {
                    return category.id ===  parseInt(newCategory.options[newCategory.selectedIndex].value, 10);
                });

                this.setState({
                    productCategory: productCategory[0].name,
                    productCategoryId: productCategory[0].id
                });
            });

        this.setState({
            currentProduct: editedProduct,
            editing: !editing
        });

        httpService.put(`${URLS.products}/${currentProduct.id}`, currentProduct);
    };

    render() {
        const { editing, currentProduct } = this.state;
        const { role } = this.props;
        return (
            <Layout history={this.props.history}>
                <div className='top-btns'>
                    <button className="btn_back" onClick={this.goBack}>Back</button>
                    { !editing && role == true && <button onClick={this.editToggle} className="btn_edit">Edit</button>  }
                </div>
                {!editing && this.renderProductDetails()}
                {!editing &&
                    <div className="btn_buy">
                        {currentProduct.count > 1 && <button>Buy</button> }
                        {currentProduct.count < 1 && <h4>Product is no available now!</h4>}
                    </div>

                }
                {editing && this.renderEditTemplate()}
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