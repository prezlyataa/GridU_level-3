import React, { Component } from 'react';
import { connect } from 'react-redux';
import './secondPage.css';

const mapStateToProps = state => {
    return { persons: state.persons };
};

class ConnectedSecondPage extends Component {
    constructor(persons){
        super(persons);
    }
    render() {
        console.log(this.props.persons);
        return(
            <div>
                <h3 className='page_title'>SecondPage</h3>
                <div className="persons">
                    {this.props.persons.map((person, id) => (
                        <div key={id}>
                            <p>{id}) {person.name} {person.age}</p>
                            <button>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const SecondPage = connect(mapStateToProps)(ConnectedSecondPage);

export default SecondPage;