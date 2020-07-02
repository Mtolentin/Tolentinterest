import {combineReducers} from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import usersErrorsReducer from './users_errors_reducer';
import tinsErrorsReducer from './tins_errors_reducer';
import shelvesErrorsReducer from './shelves_errors_reducer';

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    users: usersErrorsReducer,
    tins: tinsErrorsReducer,
    shelves: shelvesErrorsReducer
});

export default errorsReducer;