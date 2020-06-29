import * as TAU from '../util/tin_api_util';

export const RECEIVE_TINS = "RECEIVE_TINS";
export const RECEIVE_TIN = "RECEIVE_TIN";
export const REMOVE_TIN = "REMOVE_TIN";
export const RECEIVE_TIN_ERRORS = "RECEIVE_TIN_ERRORS";

export const receiveTins = tins => ({
    type: RECEIVE_TINS,
    pins
})

export const receiveTin = tin => ({
    type: RECEIVE_TIN,
    pin
})

export const removeTin = tinId => ({
    type: REMOVE_TIN,
    tinId
})

export const receiveTinErrors = errors => ({
    type: RECEIVE_TIN_ERRORS,
    errors
})

export const fetchTins = () => dispatch => {
    return TAU.fTs()
        .then( tins => dispatch(receiveTins(tins)),
        error => dispatch(receiveTinErrors(error.responseJSON)))
}

export const fetchTin = pinId => dispatch => {
    return TAU.fT(tinId)
        .then( tin => dispatch(receiveTin(tin)),
        error => dispatch(receiveTinErrors(error.responseJSON)))
}

export const createTin = tin => dispatch => {
    return TAU.cT(pin)
        .then( tin => dispatch(receiveTin(Tin)),
        error => dispatch(receiveTinErrors(error.responseJSON)))
}

export const updatePin = pin => dispatch => {
    return TAU.uT(tin)
        .then( tin => dispatch(receiveTin(tin)),
        error => dispatch(receiveTinErrors(error.responseJSON)))
}

export const deleteTin = tinId => dispatch => {
    return TAU.dT(tinId)
        .then( tinId => dispatch(removeTin(tinId)),
        error => dispatch(receiveTinErrors(error.responseJSON)))
}

export const saveToShelf = (tin_shelf) => dispatch => {
    return TAU.st(tin_shelf)
        .then( tinId => dispatch(fetchTin(tinId)),
        error => dispatch(receiveTinErrors(error.responseJSON)))
}