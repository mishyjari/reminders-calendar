import React from 'react';

const ReminderPreview = ({ text, color, date, id, handleClick }) => {
    return (
        <li
            key={id}
            id={id}
            className={`reminder-preview reminder-color-${color}`}
            onClick={handleClick}
        >
            <span className='reminder-time'>
                {date.format("HH:mm")}
            </span>
            <span className='reminder-text' style={{ color: color }}>
                {text}
            </span>
        </li>
    );
}
 
export default ReminderPreview;