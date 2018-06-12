import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FirstPage } from './components/FirstPage/index';
import { SecondPage } from './components/SecondPage/index';
import { LoginPage } from './components/LoginPage/index';
import PropTypes from 'prop-types';
import dependencies, { registerDependencies } from './dependencies';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        registerDependencies();
    }

    getChildContext() {
        return dependencies;
    }

    render() {
        return (
           <div className='appContainer'>
               <Switch>
                   <Route exact path='/' component={ LoginPage }/>
                   <Route path='/firstPage' component={ FirstPage }/>
                   <Route path='/secondPage' component={ SecondPage }/>
               </Switch>
           </div>
        );
    }
}

App.childContextTypes = {
    data: PropTypes.object,
    get: PropTypes.func,
    register: PropTypes.func
};

export default App;