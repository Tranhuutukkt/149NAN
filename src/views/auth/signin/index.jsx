import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useScrollTop, useDocumentTitle} from "../../../hooks";
import {useEffect} from "react";
import {setAuthenticating, setAuthStatus} from "../../../redux/actions/miscActions.js";
import {signIn} from "../../../redux/actions/authActions.js";
import {LoadingOutlined} from "@ant-design/icons";
import {Field, Form, Formik} from "formik";
import CustomInput from "../../../components/formik/CustomInput.jsx";
import {RESET_PASSWORD, SIGNUP_STEP1} from "../../../routers/routes.js";
import {Link} from "react-router-dom";

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email không hợp lệ.')
        .required('Bắt buộc điền email.'),
    password: Yup.string()
        .required('Bắt buộc điền mật khẩu.')
});

const SignIn = ({ history }) => {
    const { authStatus, isAuthenticating } = useSelector((state) => ({
        authStatus: state.app.authStatus,
        isAuthenticating: state.app.isAuthenticating
    }));

    const dispatch = useDispatch();

    useScrollTop();
    useDocumentTitle('Đăng nhập');

    useEffect(() => () => {
        dispatch(setAuthStatus(null));
        dispatch(setAuthenticating(false));
    }, []);

    const onSignUp = () => {
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");
        history.push(SIGNUP_STEP1);
    };

    const onSubmitForm = (form) => {
        dispatch(signIn(form.email, form.password));
    };

    const onClickLink = (e) => {
        if (isAuthenticating) e.preventDefault();
    };

    return (
        <div className="auth-content">
            {authStatus?.success && (
                <div className="loader">
                    <h3 className="toast-success auth-success">
                        {authStatus.message}
                        <LoadingOutlined />
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
                            <h3>ĐĂNG NHẬP</h3>
                            <br />
                            <div className="auth-wrapper">
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: ''
                                    }}
                                    validateOnChange
                                    validationSchema={SignInSchema}
                                    onSubmit={onSubmitForm}
                                >
                                    {() => (
                                        <Form>
                                            <div className="auth-field">
                                                <Field
                                                    disabled={isAuthenticating}
                                                    name="email"
                                                    type="email"
                                                    label="Email"
                                                    placeholder="test@example.com"
                                                    component={CustomInput}
                                                />
                                            </div>
                                            <div className="auth-field">
                                                <Field
                                                    disabled={isAuthenticating}
                                                    name="password"
                                                    type="password"
                                                    label="Mật khẩu"
                                                    autoComplete="on"
                                                    suggested="current-password"
                                                    placeholder="Mật khẩu của bạn"
                                                    component={CustomInput}
                                                />
                                            </div>
                                            <br />
                                            <div className="auth-field auth-action">
                                                <Link
                                                    onClick={onClickLink}
                                                    style={{ textDecoration: 'underline' }}
                                                    to={RESET_PASSWORD}
                                                >
                                                    <span>Quên mật khẩu?</span>
                                                </Link>
                                                <button
                                                    className="button auth-button"
                                                    disabled={isAuthenticating}
                                                    type="submit"
                                                >
                                                    {isAuthenticating ? 'Đang đăng nhập' : 'Đăng nhập'}
                                                    &nbsp;
                                                    {isAuthenticating ?
                                                        <LoadingOutlined /> :
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    }
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="auth-message">
                        <span className="auth-info">
                            <strong>Chưa có tài khoản?</strong>
                        </span>
                        <button
                            className="button button-small button-border button-border-gray button-icon"
                            disabled={isAuthenticating}
                            onClick={onSignUp}
                            type="button"
                        >
                            Đăng kí ngay!
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SignIn;