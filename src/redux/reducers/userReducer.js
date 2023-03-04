import {GET_ALL_USER_SUCCESS} from "../constants.js";

export default (state = {total: 0, user: []}, action) => {
    switch (action.type) {
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                total: action.payload.total,
                users: action.payload.users};
        default:
            return state;
    }
}