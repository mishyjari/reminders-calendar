import React from 'react';
import { useToggle } from '../hooks/useToggle.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectReminder, unselectReminder } from '../actions/actions.js';
import ReminderPreview from './ReminderPreview.js';
import ReminderForm from './ReminderForm.js';
import moment from 'moment';

const Day = ({ calendar, day, reminders }) => {
  const [formHidden, setFormHidden] = useToggle();
  const dispatch = useDispatch();
  const selectedReminder = useSelector(
    state => state.reminders.selectedReminder
  );

  const hideAllForms = () => {
    Array.from(
      document.getElementsByClassName('new-reminder-form-container')
    ).map(c => {
      if (!c.hasAttribute('hidden')) return c.setAttribute('hidden', true);
      return c;
    });
  };

  const toggleEditForm = reminder => {
    hideAllForms(); // Hide any currently open forms before proceeding
    setFormHidden();

    return formHidden
      ? dispatch(selectReminder(reminder))
      : dispatch(unselectReminder());
  };

  const getDayContainerClassName = () => {
    if (day.isSame(moment(), 'day')) return 'day-today';
    if (day.isSame(calendar, 'month')) return 'day-container';
    return 'day-container-secondary';
  };

  return (
    <div
      id={`day-container-${day.unix()}`}
      className={getDayContainerClassName()}
    >
      <div className='day-container-heading'>
        <h3 className='date-number'>{day.date()}</h3>

        <button
          id={`new-reminder-button-${day.unix()}`}
          className='new-reminder-button'
          onClick={() => toggleEditForm(selectReminder)}
          alt='New Reminder'
        >
          {formHidden ? '+' : '×'}
        </button>
      </div>

      <div
        className='new-reminder-form-container'
        id={`new-reminder-form-container-${day.unix()}`}
        hidden={formHidden ? 'hidden' : false}
      >
        <span className='close-btn' onClick={setFormHidden}>
          ×
        </span>
        {!formHidden && (
          <ReminderForm
            day={day}
            setFormToHidden={toggleEditForm}
            reminder={selectedReminder}
          />
        )}
      </div>

      <ul className='reminders-list' id={`reminders-list-${day.unix()}`}>
        {reminders
          .filter(reminder => reminder.date.isSame(day, 'day'))
          .sort((a, b) => (a.date.unix() > b.date.unix() ? 1 : -1))
          .map(reminder => (
            <ReminderPreview
              {...reminder}
              key={`reminder-preview-${reminder.id}`}
              handleClick={() => toggleEditForm(reminder)}
            />
          ))}
      </ul>
    </div>
  );
};

export default Day;
