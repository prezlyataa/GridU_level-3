import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FirstPage } from '../components/FirstPage';
import { SecondPage } from '../components/SecondPage'
import './App.css';

class App extends Component {
    render() {
        return (
           <div className='appContainer'>
               <ul>
                   <li><a href="/">First page</a></li>
                   <li><a href="/secondPage">Second page</a></li>
               </ul>
               <hr/>
               <Switch>
                   <Route exact path='/' component={ FirstPage }/>
                   <Route path='/secondPage' component={ SecondPage }/>
               </Switch>
           </div>
        );
    }
}

export default App;