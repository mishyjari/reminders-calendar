import React from 'react';
import '../stylesheets/calendar.css';

const Day = ({ time, day, createReminder, deleteReminder }) => {

    const toggleNewReminderForm = dateId => {
        const form = document.getElementById(`new-reminder-form-container-${dateId}`);
        const button = document.getElementById(`new-reminder-button-${dateId}`)
        const list = document.getElementById(`reminders-list-${dateId}`);

        if ( form.hasAttribute('hidden') ) {
            form.removeAttribute('hidden')
            form.addEventListener('submit', e => {
                e.preventDefault();
                createReminder({
                    text: e.target.reminder.value,
                    time: day,
                    color: 'black'
                });

                const newListItem = document.createElement('li')
                newListItem.innerHTML = e.target.reminder.value;

                newListItem.addEventListener('click', () => {
                    deleteReminder(e.target.reminder.value);
                    newListItem.remove();
                })

                list.appendChild(newListItem);

                e.target.reset();
            })
            button.innerHTML = 'CANCEL'
        
        }
        else {
            form.setAttribute('hidden', 'hidden');
            form.removeEventListener('submit', form);
            button.innerHTML = 'ADD'
        }
    };

    return (
        <div
            className={day.month() === time.month() ? 'day-container' : 'day-container-secondary'}
        >
            <h3 className='date-number'>{day.date()}</h3>
            <ul className='reminders-list' id={`reminders-list-${day.format('x')}`}>
                <li>Lorem Ipsum</li>
                <li>Dolor Sit Emet</li>
            </ul>
            <div id={`new-reminder-form-container-${day.format('x')}`} hidden='hidden'>
                <form id={`new-reminder-form=${day.format('x')}`}>
                    <input type='text' name='reminder' />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <button
                id={`new-reminder-button-${day.format('x')}`}
                className='new-reminder-button'
                onClick={() => toggleNewReminderForm(day.format('x'))}
                >
                    ADD
            </button>
        </div>
    );
}
 
export default Day;