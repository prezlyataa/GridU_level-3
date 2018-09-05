import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';
import { SecondPage } from '../components/SecondPage';
import { ProductsPage } from '../components/ProductsPage';
import { ProductDetailsPage } from '../components/ProductDetailsPage';
import { NotFoundPage } from '../components/NotFoundPage';

export class RouteSchema extends Component {
    render() {
        return [
            <Route key='login' exact path='/' component={ LoginPage }/>,
            <Route key='productspage' path='/productsPage' component={ ProductsPage }/>,
            <Route key='productdetailspage' path='/productDetailsPage' component={ ProductDetailsPage }/>,
            <Route key='secondpage' path='/secondPage' component={ SecondPage }/>,
            <Route key='notfoundpage' path='*' component={ NotFoundPage } />
        ];
    }
}
