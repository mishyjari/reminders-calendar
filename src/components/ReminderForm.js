import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createReminder, updateReminder, deleteReminder } from '../actions/actions.js';
import moment from 'moment';

class ReminderForm extends Component {
    state = { 
        text: '',
        color: 'black',
        date: this.props.day || moment(),
        id: null
    }

    componentDidMount() {
        // If the date of the selectedReminder from store matches the date of this form's parent, set state to that reminder
        if ( this.props.reminder && this.props.reminder.date.isSame(this.props.day, 'day')) {
            this.setState(this.props.reminder)
        }
        // Give focus to the text input
        document.getElementById(`text-${this.state.date.unix()}=${this.state.id}`).focus()
    }

    // Input change handlers to update controlled form component
    handleChangeText = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeTime = e => {
        this.setState(prevState => ({
            date: moment(`${prevState.date.format('YYYY-MM-DD')} ${e.target.value}`, 'YYYY-MM-DD HH:mm')
            }))
    }
    handleChangeDate = e => {
        this.setState(prevState => ({
            date: moment(`${e.target.value} ${prevState.date.format("HH:mm")}`, 'YYYY-MM-DD HH:mm')
        }))
    }
    handleChangeColor = e => {
        this.setState({ color: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();

        // If state.id !== null, form was rendered with an existing reminder
        // Call Update action
        if ( this.state.id ) {
            this.props.updateReminder(this.state)
            this.setState({ 
                text: '',
                color: 'black',
                date: this.props.day || moment(),
                id: null
            }, () => {
                this.props.handleNewReminder()
            })
        }
        // Otherwise it is a new reminder, call Create
        else {
            this.props.createReminder(this.state)
            this.setState({ 
                text: '',
                color: 'black',
                date: this.props.day || moment(),
                id: null
            }, () => {
                this.props.handleNewReminder()
            })
        }
    }


    render() { 
        const day = this.props.day;
        return (
            <form 
                id={`new-reminder-form-${day.format('x')}`}
                onSubmit={this.handleSubmit}
            >
                {/* { Only render the delete button if we are editting an existing remidner } */}
                {
                    this.state.id
                    ?  
                        <button onClick={(() => this.props.deleteReminder(this.state.id))}>DELETE</button>
                    :
                    null
                }

                {/* Input field for text property */}
                <input 
                    id={`text-${this.state.date.unix()}=${this.state.id}`}
                    type='text' 
                    name='text'
                    value={this.state.text}
                    required={true}
                    maxLength='30'
                    onChange={this.handleChangeText}
                    autoComplete='off'
                />

                {/* Remaining Characters Display */}
                <h5 className='remaining-chars' 
                    style={ this.state.text.length === 30 ? {color: 'red'} : null }
                >
                    {30 - this.state.text.length}
                </h5>
                
                {/* Date and time inputs */}
                <input 
                    type='time'
                    value={this.state.date.format("HH:mm")}
                    onChange={this.handleChangeTime}
                />
                <input 
                    type='date'
                    value={this.state.date.format("YYYY-MM-DD")}
                    onChange={this.handleChangeDate}
                />

                {/* Radio form for selecting display color */}
                <div>
                    <input type='radio' name='color-select' value='black'  onChange={this.handleChangeColor} checked={this.state.color === 'black'} />Black
                    <input type='radio' name='color-select' value='red' onChange={this.handleChangeColor} checked={this.state.color === 'red'}/>Red
                    <input type='radio' name='color-select' value='green' onChange={this.handleChangeColor} checked={this.state.color === 'green'}/>Green
                    <input type='radio' name='color-select' value='blue' onChange={this.handleChangeColor} checked={this.state.color === 'blue'}/>Blue
                    <input type='radio' name='color-select' value='orange' onChange={this.handleChangeColor} checked={this.state.color === 'orange'} />Orange
                </div>

                <button type='submit'>Submit</button>
            </form>
        );
    }
}
 
export default connect(
    null,
    { createReminder, updateReminder, deleteReminder }
)(ReminderForm);