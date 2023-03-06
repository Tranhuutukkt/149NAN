import authReducer from "./authReducer.js";
import miscReducer from "./miscReducer.js";
import userReducer from "./userReducer.js";
import profileReducer from "./profileReducer.js";

const rootReducer = {
    auth: authReducer,
    app: miscReducer,
    users: userReducer,
    profile: profileReducer
}

export default rootReducer;