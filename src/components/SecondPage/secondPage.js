import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { articles: state.articles };
};

class ConnectedSecondPage extends Component {
    constructor(articles){
        super(articles);
    }
    render() {
        console.log(this.props.articles);
        return(
            <div>
                <h3>SecondPage</h3>
            </div>
        )
    }
}

const SecondPage = connect(mapStateToProps)(ConnectedSecondPage);

export default SecondPage;