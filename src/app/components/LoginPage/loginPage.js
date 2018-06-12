import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson, deletePerson, sortByAge } from '../../actions';
import { Field, reduxForm } from 'redux-form';

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

class ConnectedLoginPage extends Component {
    constructor(props){
        super(props);
        autoBind(this);
    }

    submit(values) {
        console.log(values);
    }

    render() {
        return (
            <div>
                <h3>Login page</h3>
                <div className="form">
                    <div className="container">
                        <h2>Sign In</h2>
                        <form onSubmit={this.submit}>
                            <Field name="login"
                                   component="input"
                                   type="text"
                                   placeholder="Login"
                            />
                            <Field name="password"
                                   component="input"
                                   type="password"
                                   placeholder="Password"
                            />
                            <button type="submit" className="blue">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const LoginPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPage);

export default reduxForm({
    form: 'signin'
})(LoginPage);

// export default withWire(
//     LoginPage,
//     ['httpService'],
//     httpService  => ({ httpService })
// );