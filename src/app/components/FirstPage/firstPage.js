import React, { Component } from 'react';
import { addPerson, deletePerson, sortByAge } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withWire from '../../hocs/withWire';
import PropTypes from 'prop-types';
import { URLS } from '../../consts/apiConsts';
import { Layout } from '../Layout/index';
import './firstPage.css';

const autoBind = require('auto-bind');

const mapDispatchToProps = dispatch => {
    return {
        addPerson: person => dispatch(addPerson(person)),
        deletePerson: person => dispatch(deletePerson(person)),
        sortByAge: () => dispatch(sortByAge()),
    };
};

const mapStateToProps = state => {
    return { persons: state.persons };
};

class ConnectedFirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        };
        autoBind(this);
    }

    // componentWillMount() {
    //     const { httpService } = this.props;
    //     httpService.get(URLS.products)
    //         .then(response => console.log(response));
    //     httpService.get(URLS.users)
    //         .then(response => console.log(response));
    // }

    handleChangeName(event) {
        event.preventDefault();
        this.setState({
            name: event.target.value,
        })
    }

    addNewUser() {
        const { httpService } = this.props;
        const newUser = {
            id: 5,
            login: "igor",
            password: "igor123",
            roleId: 1
        };

        httpService.post(URLS.users, newUser);
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

    handleLogOut() {
        this.props.authService.logout();
        this.props.history.replace('/');
    }

    render() {
        const { persons } = this.props;
        // console.log(this.props.persons);
        return (
            <Layout history={this.props.history}>
                <h3 className='page_title'>First page</h3>
                <div>
                    <ul className='links'>
                        <li><Link to='/firstPage'>First page</Link></li>
                        <li><Link to='/secondPage'>Second page</Link></li>
                    </ul>
                    <button onClick={this.handleLogOut}>Logout</button>
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
                <div><button onClick={this.addNewUser}>Add user</button></div>
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
        );
    }
}

const FirstPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedFirstPage);

FirstPage.propTypes = {
    httpService: PropTypes.shape({
        get: PropTypes.func,
        post: PropTypes.func,
        put: PropTypes.func,
        delete: PropTypes.func
    }).isRequired
};

export default withWire(
    FirstPage,
    ['httpService', 'authService'],
    (httpService, authService)  => ({ httpService, authService })
);