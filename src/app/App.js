import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { FirstPage } from './components/FirstPage/index';
import { SecondPage } from './components/SecondPage/index';
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
               <div>
                   <ul className='links'>
                       <li><Link to='/'>First page</Link></li>
                       <li><Link to='/secondPage'>Second page</Link></li>
                   </ul>
               </div>
               <hr/>
               <Switch>
                   <Route exact path='/' component={ FirstPage }/>
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