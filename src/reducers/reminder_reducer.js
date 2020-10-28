import { CREATE_REMINDER, DELETE_REMINDER } from '../actions/index.js';
import moment from 'moment';

const initialState = {
    reminders: []
}

export const reminderReducer = (state=initialState, action) => {
    switch( action.type ) {
        case CREATE_REMINDER:
            return {
                ...state,
                reminders: [...state.reminders, action.payload]
            }
        case DELETE_REMINDER:
            // Find the index of target by id
            const targetIdx = state.reminders.findIndex(reminder => {
                return reminder.id === action.payload
            });
 
            // Just return state if this reminder is not found
            if ( targetIdx === -1 ) { return state }

            // Create a copy of reminders state array from store and splice
            const newState = [...state.reminders]
            newState.splice(targetIdx,1)

            return {
                ...state,
                reminders: newState
            }
        default:
            return state
    }
}