import React from 'react';

const ReminderPreview = ({ text, color, date, id, handleClick }) => {

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