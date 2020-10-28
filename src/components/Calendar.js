import React from 'react';
import DayContainer from '../containers/DayContainer.js';
import '../stylesheets/calendar.css';

const Calendar = ({ time, showPrevMonth, showNextMonth, days }) => {
    const month = time.format('MMMM');
    const year = time.format('YYYY');

    return (
        <div className='calendar'>
            <div id='calendar-title'>
                <button onClick={() => showPrevMonth()}>Prev</button>
                <button onClick={() => showNextMonth()}>Next</button>
                <h2>{ month } { year }</h2>
            </div>
            <div className='weekdays'>
                <div className='weekday-heading'>Sunday</div>
                <div className='weekday-heading'>Monday</div>
                <div className='weekday-heading'>Tuesday</div>
                <div className='weekday-heading'>Wednesday</div>
                <div className='weekday-heading'>Thursday</div>
                <div className='weekday-heading'>Friday</div>
                <div className='weekday-heading'>Saturday</div>
            </div>
            <div className='calendar-body'>
                {
                    days().map(day => <DayContainer key={day.format('x')} day={day} time={time} reminders={[]} />)
                }
            </div>
        </div>        
    );
}
 
export default Calendar;