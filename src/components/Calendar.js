import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showNextMonth, showPrevMonth } from '../actions/actions.js';
import DayContainer from './Day.js';
import moment from 'moment';

const CalendarContainer = () => {

    // Redux Hooks
    const calendar = useSelector(state => state.calendar.time)
    const reminders = useSelector(state => state.reminders.reminders)
    const dispatch = useDispatch();

    // Function to return an array of moment.js instances representing days in the current month
    // Prepend / Append as necessary to square off caledar Sunday - Saturday
    const getDaysInCalendar = () => {
        const daysInCalendar = [];

        // Start by creating an instance for each day in the month using a loop against moment's daysInMonth() method
        for ( let dayOfMonth = 1; dayOfMonth <= calendar.daysInMonth(); dayOfMonth++ ) {
            daysInCalendar.push(
                moment( calendar ).set( 'date', dayOfMonth ) )};

        // Now prepend days to the array until the first element day() returns 0 (Sunday)
        while ( daysInCalendar[0].day() > 0 ) {
            daysInCalendar.unshift(
                moment( daysInCalendar[0] ).subtract( 1, 'day' ) )};

        // Finally, append the array until the final element day() returns 7 (Saturday)
        while ( daysInCalendar[daysInCalendar.length-1].day() < 6 ) {
            daysInCalendar.push(
                moment( daysInCalendar[daysInCalendar.length-1] ).add( 1, 'day' ) )};

        return daysInCalendar;
    }

    return (
        <div className='calendar'>

            {/* Title - Month/Year and Toggle Month Buttons */}
            <div className='calendar-title'>
                <button className='month-toggle' onClick={() => dispatch(showPrevMonth())}>{`<`}</button>
                <h2>{ calendar.format('MMMM') } { calendar.format("YYYY") }</h2>
                <button className='month-toggle' onClick={() => dispatch(showNextMonth())}>{`>`}</button>
            </div>
            
            {/* Headings for day names */}
            <div className='weekdays'>
                <div className='weekday-heading'><h4>Sunday</h4></div>
                <div className='weekday-heading'><h4>Monday</h4></div>
                <div className='weekday-heading'><h4>Tuesday</h4></div>
                <div className='weekday-heading'><h4>Wednesday</h4></div>
                <div className='weekday-heading'><h4>Thursday</h4></div>
                <div className='weekday-heading'><h4>Friday</h4></div>
                <div className='weekday-heading'><h4>Saturday</h4></div>
            </div>

            {/* Create an instance of DayContainer for each element in the output from getDaysInCalendar() */}
            <div className='calendar-body'>
                {
                    getDaysInCalendar().map(day => <DayContainer key={day.format('x')} day={day} calendar={calendar} reminders={reminders} />)
                }
            </div>
        </div>  
    );
}
 
export default CalendarContainer;