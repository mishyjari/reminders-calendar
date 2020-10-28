import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReminder } from '../actions/index.js';

const ReminderPreview = ({ text, color, date, id, handleClick }) => {
    const dispatch = useDispatch();
    return (
        <li
            key={id}
            id={id}
            className={`reminder-preview reminder-color-${color}`}
            onClick={handleClick}
        >
            <strong>{date.format("HH:mm a")}</strong> <em style={{ color: color }}>{text}</em>
        </li>
    );
}
 
export default ReminderPreview;