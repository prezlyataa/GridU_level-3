import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';
import { SecondPage } from '../components/SecondPage';
import { FirstPage } from '../components/FirstPage';

export class RouteSchema extends Component {
    render() {
        return [
            <Route key='login' exact path='/' component={ LoginPage }/>,
            <Route key='firstpage' path='/firstPage' component={ FirstPage }/>,
            <Route key='secondpage' path='/secondPage' component={ SecondPage }/>
        ];
    }
}