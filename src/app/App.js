import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
               <Router>
                   <div>
                       <Route exact path='/' component={ LoginPage }/>
                       <Route path='/firstPage' component={ FirstPage }/>
                       <Route path='/secondPage' component={ SecondPage }/>
                   </div>
               </Router>
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