import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import tinsReducer from './tins_reducer';
import shelvesReducer from './shelves_reducer';
import tinShelvesReducer from './tin_shelves_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    tins: tinsReducer,
    shelves: shelvesReducer,
    tinshelves: tinShelvesReducer
})

export default entitiesReducer;