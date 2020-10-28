import React from 'react';
import { useToggle } from '../hooks/useToggle.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectReminder } from '../actions/actions.js';
import ReminderPreview from './ReminderPreview.js';
import ReminderForm from './ReminderForm.js';

import '../stylesheets/calendar.css';

const Day = ({ calendar, day, reminders }) => {

    const [ formHidden, setFormHidden ] = useToggle();
    const dispatch = useDispatch();
    const selectedReminder = useSelector(state => state.reminders.selectedReminder)

    const toggleEditForm = reminder => {
        setFormHidden();
        dispatch(selectReminder(reminder))
    }

    //console.log(selectedReminder)    

    // Pass this down to the ReminderForm Component so that we habe access to useToggle on submit
    const handleNewReminder = e => setFormHidden(e)

    return (
        <div
            className={day.month() === calendar.month() ? 'day-container' : 'day-container-secondary'}
        >
            <h3 className='date-number'>{day.date()}</h3>
            
            <button
                id={`new-reminder-button-${day.format('x')}`}
                className='new-reminder-button'
                onClick={setFormHidden}
                >
                    { formHidden ? 'ADD' : 'CANCEL' }
            </button>

            <div id={`new-reminder-form-container-${day.format('x')}`}>
                { formHidden ? null : <ReminderForm day={day} handleNewReminder={handleNewReminder} reminder={selectedReminder} /> }
            </div>
            
            <ul className='reminders-list' id={`reminders-list-${day.format('x')}`}>
                {
                    reminders
                        .filter(reminder => reminder.date.isSame(day, 'day'))
                        .sort((a,b) => a.date.unix() > b.date.unix() ? 1 : -1)
                        .map(reminder => <ReminderPreview key={`reminder-preview-${reminder.id}`} {...reminder} handleClick={() => toggleEditForm(reminder)} />)
                }
            </ul>
        </div>
    );
}
 
export default Day;