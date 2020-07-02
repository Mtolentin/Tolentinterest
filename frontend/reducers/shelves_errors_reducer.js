import { RECEIVE_SHELF_ERRORS } from '../actions/shelf_actions';


import { CLEAR_ERRORS } from '../actions/session_actions';



const ShelvesErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SHELF_ERRORS:
            return action.errors;
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
}

export default ShelvesErrorsReducer;