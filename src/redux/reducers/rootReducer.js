import authReducer from "./authReducer.js";
import miscReducer from "./miscReducer.js";
import userReducer from "./userReducer.js";

const rootReducer = {
    auth: authReducer,
    app: miscReducer,
    users: userReducer,
}

export default rootReducer;