// const initState = {
//   name: '',
//   email: '@gmail.com',
//   avatar: ,
//   banner,
//   dateJoined: 1954234787348
// };

import {CLEAR_PROFILE, SET_PROFILE, UPDATE_PROFILE_SUCCESS} from "../constants.js";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return action.payload;
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_PROFILE:
            return {};
        default:
            return state;
    }
}