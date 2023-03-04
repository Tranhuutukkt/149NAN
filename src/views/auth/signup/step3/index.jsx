import React, {useEffect} from "react";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useDocumentTitle, useScrollTop} from "../../../../hooks/index.js";
import {setAuthenticating, setAuthStatus} from "../../../../redux/actions/miscActions.js";
import {signUp} from "../../../../redux/actions/authActions.js";
import {Field, Form, Formik} from "formik";
import CustomInput from "../../../../components/formik/CustomInput.jsx";
import {ArrowLeftOutlined, ArrowRightOutlined, LoadingOutlined} from "@ant-design/icons";
import PropType from "prop-types";
import {withRouter} from "react-router-dom";
import StepTracker from "../../../../components/common/StepTracker.jsx";
import {HOME, LOGIN, SIGNUP_STEP2} from "../../../../routers/routes.js";

const PasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Bắt buộc cần nhập mật khẩu!')
        .min(8,'Mật khẩu của bạn cần ít nhất 8 kí tự!')
        .matches(/[A-Z\W]/g, 'Mật khẩu cần ít nhất một chữ cái hoa!')
});

const PasswordSelect = ({history}) => {
    const { isAuthenticating, authStatus} = useSelector((state) => ({
        isAuthenticating: state.app.isAuthenticating,
        authStatus: state.app.authStatus,
    }));
    const dispatch = useDispatch();
    const registerLabel = ["Họ và tên", "Email", "Mật khẩu"];
    useScrollTop();
    useDocumentTitle('Register Step 3');

    useEffect(() => () => {
        dispatch(setAuthStatus(null));
        dispatch(setAuthenticating(false));
    }, []);

    const name = window.localStorage.getItem("name");

    const onClickPrevious = () => history.push(SIGNUP_STEP2);

    const onFormSubmit = (form) => {
        const user = {
            name: name,
            email: window.localStorage.getItem("email"),
            password: form.password.trim()};
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");
        dispatch(signUp(user));
        history.push(HOME);
    };

    return (
        <div className="register">
            <StepTracker current={3} label={registerLabel}/>
            <div className='auth-content'>
                {authStatus?.success && (
                    <div className="loader">
                        <h3 className="toast-success auth-success">
                            {authStatus?.message}
                            <LoadingOutlined/>
                        </h3>
                    </div>
                )}
                {!authStatus?.success && (
                    <>
                        {authStatus?.message && (
                            <h5 className="text-center toast-error">
                                {authStatus?.message}
                            </h5>
                        )}
                        <div className={`auth ${authStatus?.message && (!authStatus?.success && 'input-error')}`}>
                            <div className="auth-main">
                                <h3>Xin chào {name}!</h3>
                                <h3>Điền mật khẩu của bạn để tiếp tục đăng kí.</h3>
                                <h5>Lưu ý: Mật khẩu gồm ít nhất 8 kí tự, trong đó có ít nhất một chữ in hoa.</h5>
                                <Formik
                                    initialValues={{password: ''}}
                                    onSubmit={onFormSubmit}
                                    validateOnChange
                                    validationSchema={PasswordSchema}
                                >
                                    {()=>(
                                        <Form>
                                            <div className='auth-field'>
                                                <Field
                                                    disabled={isAuthenticating}
                                                    name='password'
                                                    type='password'
                                                    label='Mật khẩu * : '
                                                    placeholder="Mật khẩu của bạn"
                                                    component={CustomInput}
                                                />
                                            </div>
                                            <br/>
                                            <div className="register-action">
                                                <button
                                                    className="button button-muted"
                                                    onClick={onClickPrevious}
                                                    type="button"
                                                >
                                                    <ArrowLeftOutlined/>
                                                    &nbsp;
                                                    Quay lại
                                                </button>
                                                <button
                                                    className="button button-muted"
                                                    onClick={()=>history.push(LOGIN)}
                                                >
                                                    <i className="fa-solid fa-right-to-bracket"></i>
                                                    &nbsp;
                                                    Login
                                                </button>
                                                <div className="auth-field auth-action auth-action-signup">
                                                    <button
                                                        className="button auth-button"
                                                        disabled={isAuthenticating}
                                                        type="submit"
                                                    >
                                                        {isAuthenticating ? 'Đang đăng kí': 'Đăng kí'}
                                                        &nbsp;
                                                        {isAuthenticating ? <LoadingOutlined /> : <ArrowRightOutlined />}
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>

    );
};

PasswordSelect.propTypes = {
    history: PropType.shape({
        push: PropType.func
    }).isRequired
};

export default withRouter(PasswordSelect);