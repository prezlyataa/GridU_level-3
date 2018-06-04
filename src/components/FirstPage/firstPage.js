import React, { Component } from 'react';

export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    increase() {
        const { count } = this.state;
        this.setState({
            count: count + 1
        });
    }

    decrease() {
        const { count } = this.state;
        this.setState({
            count: count - 1
        })
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                <h3>First page</h3>
                <div>
                    <button onClick={ this.increase }>Increase</button>
                    <button onClick={ this.decrease }>Decrease</button>
                    <p>{ count }</p>
                </div>
            </div>
        );
    }

}