import {setLoading, setRequestStatus} from "../actions/miscActions.js";
import {put, call} from "redux-saga/effects";
import {displayActionMessage} from "../../helpers/utils.js";
import {GET_ALL_USER} from "../constants.js";
import firebase from "../../services/firebase.js";
import {getAllUserSuccess} from "../actions/userActions.js";

function* initRequest() {
    yield put(setLoading(true));
    yield put(setRequestStatus(null));
}

function* handleAction(location, message, status) {
    if (location) yield call(history.push, location);
    yield call(displayActionMessage, message, status);
}

function* handleError(e) {
    yield put(setLoading(false));
    yield put(setRequestStatus(e?.message || 'Failed to fetch users'));
    console.log('ERROR: ', e);
}

function* userSaga({type, payload}) {
    switch (type) {
        case GET_ALL_USER: {
            try {
                yield initRequest();
                const result = yield call(firebase.getAllUsers);

                if (result.total === 0) {
                    handleError('No users found.');
                }
                else {
                    yield put(getAllUserSuccess(result));
                }
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;
        }
    }
}

export default userSaga;