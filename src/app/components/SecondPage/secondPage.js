import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withWire from '../../hocs/withWire';
import { Layout } from '../Layout/index';
import './secondPage.css';

const mapStateToProps = state => {
    return { persons: state.persons };
};

class ConnectedSecondPage extends Component {
    render() {
        const { greetingService, persons } = this.props;
        return(
            <Layout history={this.props.history}>
                <h3 className='page_title'>SecondPage</h3>
                <div>
                    <ul className='links'>
                        <li><Link to='/firstPage'>First page</Link></li>
                        <li><Link to='/secondPage'>Second page</Link></li>
                    </ul>
                </div>
                <p>{greetingService.writeGreet()}</p>
                <div className="persons">
                    {persons.map((person, id) => (
                        <div key={id}>
                            <p>{id}) {person.name} {person.age}</p>
                        </div>
                    ))}
                </div>
            </Layout>
        )
    }
}

const SecondPage = connect(mapStateToProps)(ConnectedSecondPage);

SecondPage.propTypes = {
    greetingService: PropTypes.shape({
        writeGreet: PropTypes.func
    }).isRequired
};

export default withWire(
    SecondPage,
    ['greetingService'],
    ( greetingService ) => ({ greetingService })
);