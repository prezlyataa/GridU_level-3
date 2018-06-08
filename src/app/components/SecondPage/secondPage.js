import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withWire from '../../hocs/withWire';
import './secondPage.css';

const mapStateToProps = state => {
    return { persons: state.persons };
};

class ConnectedSecondPage extends Component {
    constructor(props, persons){
        super(props, persons);
    }
    render() {
        console.log(this.props.persons);
        return(
            <div>
                <h3 className='page_title'>SecondPage</h3>
                <p>{this.props.greetingService.writeGreet()}</p>
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

SecondPage.propTypes = {
    greetingService: PropTypes.shape({
        writeGreet: PropTypes.func
    }).isRequired
};

// export default SecondPage;
export default withWire(
    SecondPage,
    ['greetingService'],
    ( greetingService ) => ({ greetingService })
);