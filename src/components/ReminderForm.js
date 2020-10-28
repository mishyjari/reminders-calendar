import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createReminder } from '../actions/index.js';
import moment from 'moment';

class ReminderForm extends Component {
    state = { 
        text: '',
        color: 'black',
        date: this.props.day || moment(),
        id: null
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


    render() { 
        const day = this.props.day;
        return (
            <form 
                id={`new-reminder-form-${day.format('x')}`}
                onSubmit={this.handleSubmit}
            >
                <input 
                    type='text' 
                    name='text'
                    value={this.state.text}
                    required={true}
                    maxLength='30'
                    onChange={this.handleChangeText}
                    autoComplete='off'
                />
                <h6 className='remaining-chars'>
                    {30 - this.state.text.length}
                </h6>
                <button type='submit'>Submit</button>
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
                <form onChange={this.handleChangeColor}>
                    <input type='radio' name='color-select' value='black' />Black
                    <input type='radio' name='color-select' value='red' />Red
                    <input type='radio' name='color-select' value='green' />Green
                    <input type='radio' name='color-select' value='blue' />Blue
                    <input type='radio' name='color-select' value='orange' />Orange
                </form>
            </form>
        );
    }
}
 
export default connect(
    null,
    { createReminder }
)(ReminderForm);