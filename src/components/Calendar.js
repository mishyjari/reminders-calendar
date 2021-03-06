import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showNextMonth, showPrevMonth } from '../actions/actions.js';
import Day from './Day.js';
import moment from 'moment';

const WeekdayHeader = () => {
  return (
    <div className='weekday-heading-container'>
      <div className='weekday-heading'>
        <h4>Sunday</h4>
      </div>
      <div className='weekday-heading'>
        <h4>Monday</h4>
      </div>
      <div className='weekday-heading'>
        <h4>Tuesday</h4>
      </div>
      <div className='weekday-heading'>
        <h4>Wednesday</h4>
      </div>
      <div className='weekday-heading'>
        <h4>Thursday</h4>
      </div>
      <div className='weekday-heading'>
        <h4>Friday</h4>
      </div>
      <div className='weekday-heading'>
        <h4>Saturday</h4>
      </div>
    </div>
  );
};

const CalendarContainer = () => {
  const calendar = useSelector(state => state.calendar.time);
  const reminders = useSelector(state => state.reminders.reminders);
  const dispatch = useDispatch();

  // Create an array of moment instances for all days in the selected month
  // Selected month represented by the moment instance in store's 'calendar'
  // Prepend and append array as necessary so that calendar begins on Saturday and ends on Sunday
  const getDaysInCalendar = () => {
    const daysInCalendar = [];
    // Create a moment instance for each day in current month
    for (
      let dayOfMonth = 1;
      dayOfMonth <= calendar.daysInMonth(); // daysInMonth returns integer count of days
      dayOfMonth++
    ) {
      const newDay = moment(calendar).set('date', dayOfMonth);
      daysInCalendar.push(newDay);
    }

    // Prepend days to the array until the first element day() returns 0 (Sunday)
    // Note that moment's .day() method returns an integer represending day of the week (0 == Sunday, 6 == Saturday)
    while (daysInCalendar[0].day() > 0) {
      const newDay = moment(daysInCalendar[0]).subtract(1, 'day');
      daysInCalendar.unshift(newDay);
    }

    // Append the array until the final element day() returns 7 (Saturday)
    while (daysInCalendar[daysInCalendar.length - 1].day() < 6) {
      const newDay = daysInCalendar[daysInCalendar.length - 1];
      daysInCalendar.push(moment(newDay).add(1, 'day'));
    }

    return daysInCalendar;
  };

  return (
    <div className='calendar'>
      {/* Title - Month/Year and Toggle Month Buttons */}
      <div className='calendar-title'>
        <button onClick={() => dispatch(showPrevMonth())}>{`<`}</button>
        <h2>{calendar.format('MMMM YYYY')}</h2>
        <button onClick={() => dispatch(showNextMonth())}>{`>`}</button>
      </div>

      <WeekdayHeader />

      {/* Create an instance of DayContainer for each element in the output from getDaysInCalendar() */}
      <div className='calendar-body'>
        {getDaysInCalendar().map(day => (
          <Day
            key={day.unix()}
            day={day}
            calendar={calendar}
            reminders={reminders}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarContainer;
