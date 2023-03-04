import {GET_ALL_USER, GET_ALL_USER_SUCCESS} from "../constants.js";

export const getAllUser = () => ({
    type: GET_ALL_USER
});

export const getAllUserSuccess = (users) => ({
    type: GET_ALL_USER_SUCCESS,
    payload: users
});