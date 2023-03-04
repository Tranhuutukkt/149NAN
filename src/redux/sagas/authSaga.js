import {setAuthenticating, setAuthStatus} from "../actions/miscActions.js";
import {put, call} from "redux-saga/effects";
import {
    MAIL_VERIFIED,
    ON_AUTHSTATE_FAIL,
    ON_AUTHSTATE_SUCCESS,
    SET_AUTH_PERSISTENCE,
    SIGNIN,
    SIGNUP
} from "../constants.js";
import firebase from "../../services/firebase.js";
import {signInSuccess, signOutSuccess} from "../actions/authActions.js";

function* handleError(e) {
    const obj = { success: false, type: 'auth', isError: true };
    yield put(setAuthenticating(false));

    switch (e.code) {
        case 'auth/network-request-failed':
            yield put(setAuthStatus({ ...obj, message: 'Network error has occured. Please try again.' }));
            break;
        case 'auth/email-already-in-use':
            yield put(setAuthStatus({ ...obj, message: 'Email is already in use. Please use another email' }));
            break;
        case 'auth/wrong-password':
            yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
            break;
        case 'auth/user-not-found':
            yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
            break;
        case 'auth/reset-password-error':
            yield put(setAuthStatus({ ...obj, message: 'Failed to send password reset email. Did you type your email correctly?' }));
            break;
        default:
            yield put(setAuthStatus({ ...obj, message: e.message }));
            break;
    }
}

function* initRequest() {
    yield put(setAuthenticating());
    yield put(setAuthStatus({}));
}

function* authSaga({type, payload}) {
    switch (type) {
        case SIGNIN:
            try {
                yield initRequest();
                yield call(firebase.signIn, payload.email, payload.password);
            } catch (e) {
                yield handleError(e);
            }
            break;
        case SIGNUP:{
            try {
                yield initRequest();
                const ref = yield call(firebase.createAccount, payload.email, payload.password);
                const user = {
                    name: payload.name,
                    email: payload.email,
                    role: 'USER',
                    dateJoined: ref.user.metadata.creationTime || new Date().getTime()
                };
                yield call(firebase.addUser, ref.user.uid, user);
                yield put(setAuthenticating(false));
            } catch (e) {
                yield handleError(e);
            }
            break;
        }
        case ON_AUTHSTATE_SUCCESS:{
            const snapshot = yield call(firebase.getUser, payload.uid);
            if (snapshot.data()) {
                const user = snapshot.data();
                yield put(signInSuccess({
                    id: payload.uid,
                    role: user.role,
                    provider: payload.providerData[0].providerId,
                    emailVerified: payload.emailVerified,
                    email: user.email
                }));
            }
            yield put(setAuthStatus({
                success: true,
                type: 'auth',
                isError: false,
                message: 'Successfully signed in. Redirecting...'
            }));
            yield put(setAuthenticating(false));
            break;
        }
        case ON_AUTHSTATE_FAIL: {
            yield put(signOutSuccess());
            break;
        }
        case SET_AUTH_PERSISTENCE: {
            try {
                yield call(firebase.setAuthPersistence);
            } catch (e) {
                console.log(e);
            }
            break;
        }
        case MAIL_VERIFIED: {
            try {
                yield call(firebase.emailVerified);
            } catch (e) {
                console.log(e);
            }
            break;
        }
        default: {
            throw new Error('Unexpected Action Type.');
        }
    }
}

export default authSaga;