import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withWire from '../../hocs/withWire';
import { Layout } from '../Layout/index';
import './secondPage.css';
import { addPerson, deletePerson, sortByAge } from '../../actions';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        addPerson: person => dispatch(addPerson(person)),
        deletePerson: person => dispatch(deletePerson(person)),
        sortByAge: () => dispatch(sortByAge())
    };
};

const mapStateToProps = state => {
    return { persons: state.persons };
};

class ConnectedSecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        };
        autoBind(this);
    }


    handleChangeName(event) {
        event.preventDefault();
        this.setState({
            name: event.target.value,
        })
    }

    handleChangeAge(event) {
        event.preventDefault();
        this.setState({
            age: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, age } = this.state;
        const newPerson = {
            name: name,
            age: age
        };

        this.props.addPerson(newPerson);

        this.setState({
            name: '',
            age: null
        });

        this.resetInputs();
    }

    resetInputs() {
        this.formRef.reset();
    }

    render() {
        const { persons } = this.props;
        return(
            <Layout history={this.props.history}>
                <h3 className='page_title'>SecondPage</h3>
                <div>
                    <ul className='links'>
                        <li><Link to='/productsPage'>First page</Link></li>
                        <li><Link to='/secondPage'>Second page</Link></li>
                    </ul>
                </div>
                <div className='page_form'>
                    <form
                        onSubmit={this.handleSubmit}
                        ref={(el) => this.formRef = el}
                    >
                        <div className='form_fields'>
                            <input onChange={this.handleChangeName} type='text' placeholder='Name' required/>
                            <input onChange={this.handleChangeAge} type='number' placeholder='Age' required/>
                        </div>
                        <button className='add_btn'>Add person</button>
                    </form>
                </div>
                <div>
                    <button onClick={this.props.sortByAge}>Sort by age</button>
                </div>
                <div className="persons">
                    {persons.map((person, id) => (
                        <div key={id}>
                            <p>{id}) {person.name} {person.age}</p>
                            <button onClick={() => this.props.deletePerson(id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </Layout>
        )
    }
}

const SecondPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedSecondPage);

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