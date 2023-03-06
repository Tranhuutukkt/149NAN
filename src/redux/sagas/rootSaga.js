import {takeLatest} from "redux-saga/effects";
import * as ACTION from "../constants";
import authSaga from "./authSaga.js";
import userSaga from "./userSaga.js";
import profileSaga from "./profileSaga.js";

function* rootSaga() {
    yield takeLatest([
        ACTION.SIGNIN,
        ACTION.SIGNUP,
        ACTION.SIGNOUT,
        ACTION.ON_AUTHSTATE_FAIL,
        ACTION.SET_AUTH_PERSISTENCE,
        ACTION.ON_AUTHSTATE_SUCCESS,
        ACTION.MAIL_VERIFIED,
        ACTION.RESET_PASSWORD
    ], authSaga);

    yield takeLatest([
        ACTION.GET_ALL_USER,
    ], userSaga);

    yield takeLatest([
        ACTION.UPDATE_PROFILE,
    ], profileSaga);
}

export default rootSaga;