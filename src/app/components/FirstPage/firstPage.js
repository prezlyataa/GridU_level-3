import React, { Component } from 'react';
import { addPerson, deletePerson } from '../../actions';
import { connect } from 'react-redux';
import './firstPage.css';

const mapDispatchToProps = dispatch => {
    return {
        addPerson: person => dispatch(addPerson(person)),
        deletePerson: person => dispatch(deletePerson(person))
    };
};

const mapStateToProps = state => {
    return { persons: state.persons };
};

class ConnectedFirstPage extends Component {
    constructor(props, persons) {
        super(props, persons);
        this.state = {
            count: 0,
            name: '',
            age: null
        };
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
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
        const { count } = this.state;
        // console.log(this.props.persons);
        return (
            <div>
                <h3 className='page_title'>First page</h3>
                <div className='count_block'>
                    <button onClick={ this.increase }>Increase</button>
                    <button onClick={ this.decrease }>Decrease</button>
                    <p>{ count }</p>
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
                <div className="persons">
                    {this.props.persons.map((person, id) => (
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

export default FirstPage;