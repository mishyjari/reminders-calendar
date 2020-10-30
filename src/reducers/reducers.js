import { combineReducers } from 'redux';
import moment from 'moment';
import {
  PREV_MONTH,
  NEXT_MONTH,
  CREATE_REMINDER,
  DELETE_REMINDER,
  SELECT_REMINDER,
  UPDATE_REMINDER,
  UNSELECT_REMINDER,
} from '../actions/actions.js';

// Calendar Reducers
const initialCalendarState = {
  time: moment(),
};

const calendarReducer = (state = initialCalendarState, action) => {
  switch (action.type) {
    case PREV_MONTH:
      return {
        ...state,
        time: moment(state.time.subtract(1, 'month')),
      };

    case NEXT_MONTH:
      return {
        ...state,
        time: moment(state.time.add(1, 'month')),
      };

    default:
      return state;
  }
};

// Reminder Reducers
const initialReminderState = {
  reminders: [],
};

const reminderReducer = (state = initialReminderState, action) => {
  // Find target index for updating or deleting, return null if not found
  const findTargetIdxById = id => {
    const idx = state.reminders.findIndex(reminder => {
      return reminder.id === id;
    });

    return idx >= 0 ? idx : null;
  };

  switch (action.type) {
    case CREATE_REMINDER:
      return {
        ...state,
        reminders: [...state.reminders, action.payload],
      };

    case DELETE_REMINDER:
      const idxToDelete = findTargetIdxById(action.payload);
      if (idxToDelete === null) {
        return state;
      }

      // Create a copy of reminders state array from store and splice
      const newState = [...state.reminders];
      newState.splice(idxToDelete, 1);
      return {
        ...state,
        reminders: newState,
      };

    case SELECT_REMINDER:
      return {
        ...state,
        selectedReminder: state.reminders.find(
          reminder => reminder.id === action.payload.id
        ),
      };

    case UNSELECT_REMINDER:
      return {
        ...state,
        selectedReminder: null,
      };

    case UPDATE_REMINDER:
      const idxToUpdate = findTargetIdxById(action.payload.id);
      if (idxToUpdate === null) {
        return state;
      }

      // Create a copy of reminders state array from store and splice
      const updatedState = [...state.reminders];
      updatedState.splice(idxToUpdate, 1, action.payload);
      return {
        ...state,
        reminders: updatedState,
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  calendar: calendarReducer,
  reminders: reminderReducer,
});
