import { RECEIVE_TIN_ERRORS } from '../actions/tin_actions';
import { CLEAR_ERRORS } from '../actions/session_actions';

const tinsErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_TIN_ERRORS:
            return action.errors;
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
}

export default tinsErrorsReducer;