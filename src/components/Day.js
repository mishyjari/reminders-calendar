import React from 'react';
import { useToggle } from '../hooks/useToggle.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectReminder, unselectReminder } from '../actions/actions.js';
import ReminderPreview from './ReminderPreview.js';
import ReminderForm from './ReminderForm.js';

const Day = ({ calendar, day, reminders }) => {

    const [ formHidden, setFormHidden ] = useToggle();
    const dispatch = useDispatch();
    const selectedReminder = useSelector(state => state.reminders.selectedReminder)

    const toggleEditForm = reminder => {
        setFormHidden();
        formHidden ? dispatch(selectReminder(reminder)) : dispatch(unselectReminder())
    }

    // Pass this down to the ReminderForm Component so that we habe access to useToggle on submit
    const handleNewReminder = e => setFormHidden(e)


    return (
        <div
            className={day.month() === calendar.month() ? 'day-container' : 'day-container-secondary'}
        >
            <div className='day-container-heading'>
                <h3 className='date-number'>{day.date()}</h3>
                
                <button
                    id={`new-reminder-button-${day.format('x')}`}
                    className='new-reminder-button'
                    onClick={() => toggleEditForm(selectReminder)}
                    >
                        { formHidden ? '+' : '×' }
                </button>
            </div>
            

            <div className='new-reminder-form-container' id={`new-reminder-form-container-${day.format('x')}`} hidden={formHidden ? 'hidden' : false}>
                <span className='close-btn' onClick={setFormHidden}>×</span>
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