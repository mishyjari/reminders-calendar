import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showNextMonth, showPrevMonth, showCurrentMonth } from '../actions/index.js';
import Calendar from '../components/Calendar.js';
import moment from 'moment';

class CalendarContainer extends Component {

    componentDidMount() {
        console.log('mount')
    }

    componentDidUpdate() {
        console.log('update')
    }

    getDaysInMonth() {
        const time = this.props.time;
        let daysInMonth = [];

        // Using Moment's daysInMonth() method, create an array of date objects for each day in month prop
        for ( let day = 1; day <= time.daysInMonth(); day++ ) {            
            daysInMonth.push(
                moment(time) // Creates new moment() instance
                .set('date', day) // Set date to the day relative to loop
            )
        }

        // Prepend and append days as necessary to square off the calendar
        while ( daysInMonth[0].day() > 0 ) {
            daysInMonth.unshift(
                moment(
                    daysInMonth[0]
                ).subtract(1,'day')
            )
        }

        while ( daysInMonth[daysInMonth.length-1].day() < 6 ) {
            daysInMonth.push(
                moment(
                    daysInMonth[daysInMonth.length-1]
                ).add(1,'day')
            )
        }

        return daysInMonth;
    }

    render() { 
        return (
            <Calendar
                { ...this.props }
                days={() => this.getDaysInMonth()}
            />
        );
    }
}

const mapStateToProps = state => {
    return state.calendar;
}

const mapDispatchToProps = {
    showCurrentMonth,
    showNextMonth,
    showPrevMonth,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarContainer);