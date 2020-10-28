// Action Types for Calendar
export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';
export const CURRENT_MONTH = 'CURRENT_MONTH';

// Action Types for Reminders
export const CREATE_REMINDER = 'CREATE_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';

// Action creators for Calendar
export const showNextMonth = () => ({ type: NEXT_MONTH });
export const showPrevMonth = () => ({ type: PREV_MONTH });
export const showCurrentMonth = () => ({ type: CURRENT_MONTH });

// Action creators for Reminders
export const createReminder = reminder => {
        return {
                type: CREATE_REMINDER,
                payload: {
                        ...reminder,
                        id: `reminder-${new Date().getTime()}`
                }
        }
}

export const deleteReminder = id => ({
        type: DELETE_REMINDER,
        payload: id
});

