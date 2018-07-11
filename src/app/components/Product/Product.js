import React, { Component } from 'react';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import { addPerson, deletePerson, sortByAge, getProducts } from '../../actions';

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
        products: state. products
    };
};

class ConnectedProduct extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    render() {
        return(
            <div>Product</div>
        );
    }
}

const Product = connect(mapStateToProps, mapDispatchToProps)(ConnectedProduct);

export default withWire(
    Product,
    ['httpService'],
    (httpService)  => ({ httpService })
);