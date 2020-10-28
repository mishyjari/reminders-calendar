import { CREATE_REMINDER, DELETE_REMINDER, SELECT_REMINDER, UPDATE_REMINDER } from '../actions/index.js';
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
        case SELECT_REMINDER:
            return {
                ...state,
                selectedReminder: state.reminders.find(reminder => reminder.id === action.payload.id)
            }
        case UPDATE_REMINDER:

            const targetIdxToUpdate = state.reminders.findIndex(reminder => {
                return reminder.id === action.payload.id;
            }); 

            // Just return state if this reminder is not found
            if ( targetIdxToUpdate === -1 ) { return state }

            // Create a copy of reminders state array from store and splice
            const updatedState = [...state.reminders]
            updatedState.splice(targetIdxToUpdate,1, action.payload)

            return {
                ...state,
                reminders: updatedState
            }
        default:
            return state
    }
}