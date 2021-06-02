import {ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "./actionTypes"

export const addContact = (payload) => {
    return (dispatch) =>{
        dispatch({
            type: ADD_CONTACT,
            payload,
        })
    }
}
export const editContact = (payload) => {
    return (dispatch) =>{
        dispatch({
            type: EDIT_CONTACT,
            payload,
        })
    }
}
export const deleteContact = (payload) => {
    return (dispatch) =>{
        dispatch({
            type: DELETE_CONTACT,
            payload,
        })
    }
}