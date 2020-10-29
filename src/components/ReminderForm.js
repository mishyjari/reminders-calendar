import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createReminder, updateReminder, deleteReminder, unselectReminder } from '../actions/actions.js';
import moment from 'moment';

class ReminderForm extends Component {
    state = { 
        text: '',
        color: 'black',
        date: this.props.day || moment(),
        id: null
    }

    resetState(callback) {
        this.setState({ 
            text: '',
            color: 'black',
            date: this.props.day || moment(),
            id: null
        }, callback)
    }

    componentDidMount() {
        // If the date of the selectedReminder from store matches the date of this form's parent, set state to that reminder
        if ( this.props.reminder && this.props.reminder.date.isSame(this.props.day, 'day')) {
            this.setState(this.props.reminder)
        }
        // Give focus to the text input
        document.getElementById(`text-${this.state.date.unix()}=${this.state.id}`).focus();

        // Hacky fix for reminder container causing screen overflow.
        window.scroll({top: document.getElementById('root').scrollHeight, behavior: 'smooth'})

        // Close input form with escape key
        document.addEventListener('keydown', e => {
            if ( e.key === 'Escape' ) {
                this.props.handleNewReminder()
            }
        })
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
            this.resetState(() => {
                this.props.handleNewReminder()
            })
            this.props.unselectReminder();
        }
        // Otherwise it is a new reminder, call Create
        else {
            this.props.createReminder(this.state)
            this.resetState(() => {
                this.props.handleNewReminder()
            })
        }
    }


    render() { 
        const day = this.props.day;
        return (
            <form 
                className='reminder-form'
                id={`new-reminder-form-${day.format('x')}`}
                onSubmit={this.handleSubmit}
            >

                

                <h4 className='form-heading'>{this.state.id ? 'Edit Reminder' : 'Create Reminder'}</h4>

                <div className='form-row'>
                    
                    {/* Input field for text property */}
                    <input 
                        className='reminder-text-input'
                        id={`text-${this.state.date.unix()}=${this.state.id}`}
                        type='text' 
                        name='text'
                        value={this.state.text}
                        required={true}
                        maxLength='30'
                        onChange={this.handleChangeText}
                        autoComplete='off'
                        placeholder='Reminder Text'
                        
                    />

                   
                </div>
                
                <div className='form-row'>
                    {/* Input for selecting display color */}
                    <label className='label'>
                        <input type='color' className='color-select' onChange={this.handleChangeColor} value={this.state.color} />
                        <h5>Color</h5>
                    </label>

                    {/* Remaining Characters Display */}
                    <label className='label'>
                    <h5 className='remaining-chars' 
                        style={ this.state.text.length === 30 ? {color: 'red'} : null }
                    >
                        Remaining characters: {30 - this.state.text.length}
                    </h5>
                    </label>
                    
                </div>

                <div className='form-row'>
                    {/* Date and time inputs */}
                    <input 
                        type='time'
                        className='date-input'
                        value={this.state.date.format("HH:mm")}
                        onChange={this.handleChangeTime}
                    />
                    <input 
                        type='date'
                        className='date-input'
                        value={this.state.date.format("YYYY-MM-DD")}
                        onChange={this.handleChangeDate}
                    />
                </div>

                <div className='form-row-btn'>
                    <button className='submit' type='submit'>{this.state.id ? 'SAVE' : 'SUBMIT'}</button>

                    {/* { Only render the delete button if we are editting an existing remidner } */}
                    {
                        this.state.id
                        ?  
                            <button className='delete' onClick={(() => this.props.deleteReminder(this.state.id))}>delete</button>
                        :
                        null
                    }
                </div>
                
            </form>
        );
    }
}
 
export default connect(
    null,
    { createReminder, updateReminder, deleteReminder, unselectReminder }
)(ReminderForm);