import React from 'react';
import { useToggle } from '../hooks/useToggle.js';
import ReminderPreview from '../components/ReminderPreview.js';
import ReminderForm from '../components/ReminderForm.js';
import moment from 'moment';

import '../stylesheets/calendar.css';

const Day = ({ calendar, day, reminders }) => {

    const [ formHidden, setFormHidden ] = useToggle();

    // Pass this down to the ReminderForm Component so that we habe access to useToggle on submit
    const handleNewReminder = e => setFormHidden(e)

    return (
        <div
            className={day.month() === calendar.month() ? 'day-container' : 'day-container-secondary'}
        >
            <h3 className='date-number'>{day.date()}</h3>
            <ul className='reminders-list' id={`reminders-list-${day.format('x')}`}>
                {
                    reminders
                        .filter(reminder => reminder.date.isSame(day, 'day'))
                        .map(reminder => <ReminderPreview {...reminder} />)
                }
            </ul>
            <div id={`new-reminder-form-container-${day.format('x')}`}>
                { formHidden ? null : <ReminderForm day={day} handleNewReminder={handleNewReminder} /> }
            </div>
            <button
                id={`new-reminder-button-${day.format('x')}`}
                className='new-reminder-button'
                onClick={setFormHidden}
                >
                    { formHidden ? 'NEW' : 'CANCEL' }
            </button>
        </div>
    );
}
 
export default Day;