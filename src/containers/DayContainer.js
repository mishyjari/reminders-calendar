import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createReminder, deleteReminder } from '../actions/index.js';
import Day from '../components/Day.js';
import moment from 'moment';
import '../stylesheets/calendar.css'

class DayContainer extends Component {

    filterReminders() {
        return this.props.reminders.reminders
            .filter(reminder => {
                console.log(reminder)
                return reminder.time.isBetween(
                    this.props.day.startOf('day'),
                    this.props.day.endOf('day')
                )
            })
    }

    render() { 

        return <Day {...this.props} reminders={this.filterReminders} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return { reminders: state.reminders }
    //return state.reminders.filter(reminder => reminder.time.isBetween(ownProps.day.startOf('day'),ownProps.day.endOf('day')) );
};

const matchDispatchToProps = {
    createReminder,
    deleteReminder
};

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(DayContainer);