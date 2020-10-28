import { combineReducers } from 'redux'
import { calendarReducer } from './calendar_reducer.js';
import { reminderReducer } from './reminder_reducer.js';

export const rootReducer = combineReducers({ 
    calendar: calendarReducer,
    reminders: reminderReducer
});