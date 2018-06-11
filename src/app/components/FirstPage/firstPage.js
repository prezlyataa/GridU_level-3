import React, { Component } from 'react';
import { addPerson, deletePerson, sortByAge } from '../../actions';
import { connect } from 'react-redux';
import withWire from '../../hocs/withWire';
import PropTypes from 'prop-types';
import { URLS } from '../../consts/apiConsts';
import './firstPage.css';

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

class ConnectedFirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
    }

    componentWillMount() {
        const { httpService } = this.props;
        httpService.get(URLS.products)
            .then(response => console.log(response));
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
        const {name, age} = this.state;
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
        // console.log(this.props.persons);
        return (
            <div>
                <h3 className='page_title'>First page</h3>
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
            </div>
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
    ['httpService'],
    httpService  => ({ httpService })
);