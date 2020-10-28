import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReminder } from '../actions/index.js';

const ReminderPreview = ({ text, color, date, id }) => {
    const dispatch = useDispatch();
    return (
        <li
            key={id}
            id={id}
            className={`reminder-preview reminder-color-${color}`}
            onClick={() => dispatch(deleteReminder(id))}
        >
            {text}
        </li>
    );
}
 
export default ReminderPreview;