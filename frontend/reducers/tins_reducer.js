import { RECEIVE_TINS, RECEIVE_TIN, REMOVE_TIN } from '../actions/tin_actions';

const tinsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_TINS:
            return Object.assign({}, state, action.tins);
        case RECEIVE_TIN:
            return Object.assign({}, state, { [action.tin.id]: action.tin });
        case REMOVE_TIN:
            let newState = Object.assign({}, state);
            delete newState[action.tinId];
            return newState;
        default:
            return state;
    }
}

export default tinsReducer;