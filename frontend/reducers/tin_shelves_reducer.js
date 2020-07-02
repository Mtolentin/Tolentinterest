import {RECEIVE_TIN_SHELVES} from '../actions/shelf_actions'

const TinShelvesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_TIN_SHELVES:
            return action.tinshelves;
        default:
            return state;
    }
}

export default TinShelvesReducer;