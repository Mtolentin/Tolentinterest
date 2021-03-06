import { RECEIVE_PIN_ERRORS } from '../actions/pin_actions';
import { CLEAR_ERRORS } from '../actions/session_actions';

const pinsErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_PIN_ERRORS:
            return action.errors;
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
}

export default pinsErrorsReducer;