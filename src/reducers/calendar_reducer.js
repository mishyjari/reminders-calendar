import { PREV_MONTH, NEXT_MONTH } from '../actions/index.js';
import moment from 'moment';

const defaultState = {
    time: moment()
};

export const calendarReducer = (state=defaultState, action) => {

    switch( action.type ) {
        case PREV_MONTH:
            return {
                ...state,
                time: moment(state.time.subtract(1, 'month'))
            }
        case NEXT_MONTH:
            return {
                ...state,
                time: moment(state.time.add(1, 'month'))
            }
        default:
            return state
    }
}