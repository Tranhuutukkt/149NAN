import {UPDATE_PROFILE} from "../constants.js";
import {call, put, select} from 'redux-saga/effects';
import {setLoading} from "../actions/miscActions.js";
import firebase from "../../services/firebase";
import {updateProfileSuccess} from "../actions/profileActions.js";
import {displayActionMessage} from "../../helpers/utils.js";

function* profileSaga({type, payload}) {
    switch (type) {
        case UPDATE_PROFILE: {
            try {
                const state = yield select();
                const {email, password} = payload.credentials;
                const {avatarFile, bannerFile} = payload.files;

                yield put(setLoading(true));

                if (avatarFile || bannerFile) {
                    const bannerURL = bannerFile ? yield call(firebase.storeImage, state.auth.id, 'banner', bannerFile) : payload.updates.banner;
                    const avatarURL = avatarFile ? yield call(firebase.storeImage, state.auth.id, 'avatar', avatarFile) : payload.updates.avatar;
                    const updates = {...payload.updates, avatar: avatarURL, banner: bannerURL};

                    yield call(firebase.updateProfile, state.auth.id, updates);
                    yield put(updateProfileSuccess(updates));
                } else {
                    yield call(firebase.updateProfile, state.auth.id, payload.updates);
                    yield put(updateProfileSuccess(payload.updates));
                }

                yield put(setLoading(false));
                yield call(history.goBack);
                yield call(displayActionMessage, 'Cập nhật tài khoản thành công!', 'success');
            } catch (e) {
                console.log(e);
                yield put(setLoading(false));
                if (e.code === 'auth/wrong-password') {
                    yield call(displayActionMessage, 'Sai mật khẩu, cập nhật tài khoản thất bại :(', 'error');
                } else {
                    yield call(displayActionMessage, `:( Cập nhật tài khoản thất bại. ${e.message ? e.message : ''}`, 'error');
                }
            }
            break;
        }
        default: {
            throw new Error("Unexpected action type.");
        }
    }
}

export default profileSaga;