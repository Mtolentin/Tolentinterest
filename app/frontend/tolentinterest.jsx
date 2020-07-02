import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import {fetchShelves, fetchShelf, createShelf, updateShelf, deleteShelf} from './actions/shelf_actions'
// import {fetchShelf, fetchShelves} from './util/shelf_api_util';


document.addEventListener("DOMContentLoaded", () => {


    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    // window.fetchShelves = fetchShelves;
    // window.fetchShelf = fetchShelf;
    // window.createShelf = createShelf;
    // window.updateShelf = updateShelf;
    // window.deleteShelf = deleteShelf;

    const root = document.getElementById("root");
    let store;

    if (window.currentUser){
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser}
            },
            session: { currentUserId: window.currentUser.id}
        };
        store = configureStore(preloadedState);
        delete window.currentUser;


    } else { store = configureStore(); }


    ReactDOM.render(<Root store={store} />, root);
})
