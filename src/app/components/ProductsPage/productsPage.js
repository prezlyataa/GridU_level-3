import React, { Component } from 'react';
import { addPerson, deletePerson, sortByAge, getProducts } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withWire from '../../hocs/withWire';
import { URLS } from '../../consts/apiConsts';
import { Layout } from '../Layout/';
import './productsPage.css';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        addPerson: person => dispatch(addPerson(person)),
        deletePerson: person => dispatch(deletePerson(person)),
        sortByAge: () => dispatch(sortByAge()),
        getProducts: products => dispatch(getProducts(products))
    };
};

const mapStateToProps = state => {
    return {
        persons: state.persons,
        products: state. products
    };
};

class ConnectedFirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        };
        autoBind(this);
    }

    componentWillUpdate() {
        window.addEventListener('isToken', this.isToken);
    }

    componentWillMount(){
        const { httpService, getProducts } = this.props;
        this.isToken();
        httpService.get(URLS.products)
            .then(products => {
                getProducts(products);
            })
            .catch(err => {
                console.log(err);
            });
    }

    isToken() {
        const { authService } = this.props;
        if(!authService.getToken()) {
            this.props.history.replace('/');
        }
    }

    handleChangeName(event) {
        event.preventDefault();
        this.setState({
            name: event.target.value,
        })
    }

    handleChangeAge(event) {
        event.preventDefault();
        this.setState({
            age: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, age } = this.state;
        const newPerson = {
            name: name,
            age: age
        };

        this.props.addPerson(newPerson);

        this.setState({
            name: '',
            age: null
        });

        this.resetInputs();
    }

    resetInputs() {
        this.formRef.reset();
    }

    handleLogOut() {
        this.props.authService.logout();
        this.props.history.replace('/');
    }

    render() {
        const { persons, products } = this.props;
        console.log('products from redux store', products);
        return (
            <Layout history={this.props.history}>
                <h3 className='page_title'>First page</h3>
                <div>
                    <ul className='links'>
                        <li><Link to='/productsPage'>First page</Link></li>
                        <li><Link to='/secondPage'>Second page</Link></li>
                    </ul>
                </div>
                <div className='page_form'>
                    <form
                        onSubmit={this.handleSubmit}
                        ref={(el) => this.formRef = el}
                    >
                       <div className='form_fields'>
                           <input onChange={this.handleChangeName} type='text' placeholder='Name' required/>
                           <input onChange={this.handleChangeAge} type='number' placeholder='Age' required/>
                       </div>
                        <button className='add_btn'>Add person</button>
                    </form>
                </div>
                <div>
                    <button onClick={this.props.sortByAge}>Sort by age</button>
                </div>
                <div className="persons">
                    {persons.map((person, id) => (
                        <div key={id}>
                            <p>{id}) {person.name} {person.age}</p>
                            <button onClick={() => this.props.deletePerson(id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </Layout>
        );
    }
}

const ProductsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedFirstPage);

export default withWire(
    ProductsPage,
    ['httpService', 'authService'],
    (httpService, authService)  => ({ httpService, authService })
);