// Action Types for Calendar
export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';

// Action Types for Reminders
export const CREATE_REMINDER = 'CREATE_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const SELECT_REMINDER = 'SELECT_REMINDER';
export const UPDATE_REMINDER = 'UPDATE_REMINDER';
export const UNSELECT_REMINDER = 'UNSELECT_REMINDER';

// Action creators for Calendar
export const showNextMonth = () => ({ type: NEXT_MONTH });
export const showPrevMonth = () => ({ type: PREV_MONTH });

// Action creators for Reminders
export const createReminder = reminder => ({
  type: CREATE_REMINDER,
  payload: {
    ...reminder,
    id: `reminder-${new Date().getTime()}`,
  },
});

export const deleteReminder = id => ({
  type: DELETE_REMINDER,
  payload: id,
});

export const selectReminder = id => ({
  type: SELECT_REMINDER,
  payload: id,
});

export const updateReminder = data => ({
  type: UPDATE_REMINDER,
  payload: data,
});

export const unselectReminder = () => ({
  type: UNSELECT_REMINDER,
});
