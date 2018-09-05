import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { RouteSchema } from './routes';
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
                       <Switch>
                           <RouteSchema />
                       </Switch>
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