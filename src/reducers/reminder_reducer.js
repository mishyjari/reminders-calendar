import { CREATE_REMINDER, DELETE_REMINDER } from '../actions/index.js';
import moment from 'moment';

const initialState = {
    reminders: []
}

export const reminderReducer = (state=initialState, action) => {
    switch( action.type ) {
        case CREATE_REMINDER:
            console.log(state, action)
            return {
                ...state,
                reminders: [...state.reminders, action.payload]
            }
        case DELETE_REMINDER:
            return state 
        default:
            return state
    }
}