import * as SAU from '../util/shelf_api_util';

export const RECEIVE_SHELVES = "RECEIVE_SHELVES";
export const RECEIVE_SHELF = "RECEIVE_SHELF";
export const REMOVE_SHELF = "REMOVE_SHELF";
export const RECEIVE_SHELF_ERRORS = "RECEIVE_SHELF_ERRORS";
export const RECEIVE_TIN_SHELVES = "RECEIVE_TIN_SHELVES";

export const receiveShelves = shelves => ({
    type: RECEIVE_SHELVES,
    shelves
})

export const receiveShelf = shelf => ({
    type: RECEIVE_SHELF,
    shelf
})

export const removeShelf = shelfId => ({
    type: REMOVE_SHELF,
    shelfId
})

export const receiveShelfErrors = errors => ({
    type: RECEIVE_SHELF_ERRORS,
    errors
})

export const receiveTinShelves = tinshelves => ({
    type: RECEIVE_TIN_SHELVES,
    tinshelves
})

export const fetchShelves = (userId) => dispatch => {
    return SAU.fSs(userId)
        .then(shelves => dispatch(receiveShelves(shelves)),
            error => dispatch(receiveShelfErrors(error.responseJSON)))
}

export const fetchShelf = (userId, shelfId) => dispatch => {
    return SAU.fS(userId, shelfId)
        .then(shelf => dispatch(receiveShelf(shelf)),
            error => dispatch(receiveShelfErrors(error.responseJSON)))
}

export const createShelf = shelf => dispatch => {
    return SAU.cS(shelf)
        .then(shelf => dispatch(receiveShelf(shelf)),
            error => dispatch(receiveShelfErrors(error.responseJSON)))
}

export const updateShelf = shelf => dispatch => {
    return SAU.uS(shelf)
        .then(shelf => dispatch(receiveShelf(shelf)),
            error => dispatch(receiveShelfErrors(error.responseJSON)))
}

export const deleteShelf = (userId, shelfId) => dispatch => {
    return SAU.dS(userId, shelfId)
        .then(shelfId => dispatch(removeShelf(shelfId)),
            error => dispatch(receiveShelfErrors(error.responseJSON)))
}

export const fetchTinShelves = () => dispatch => {
    return SAU.fTS()
        .then(tinshelves => dispatch(receiveTinShelves(tinshelves)),
            error => dispatch(receiveShelfErrors(error.responseJSON)))
}