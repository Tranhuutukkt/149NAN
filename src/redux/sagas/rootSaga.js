import {takeLatest} from "redux-saga/effects";
import * as ACTION from "../constants";
import authSaga from "./authSaga.js";
import userSaga from "./userSaga.js";

function* rootSaga() {
    yield takeLatest([
        ACTION.SIGNIN,
        ACTION.SIGNUP,
        ACTION.ON_AUTHSTATE_FAIL,
        ACTION.SET_AUTH_PERSISTENCE,
        ACTION.ON_AUTHSTATE_SUCCESS,
        ACTION.MAIL_VERIFIED
    ], authSaga);

    yield takeLatest([
        ACTION.GET_ALL_USER,
    ], userSaga);

}

export default rootSaga;