import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useDocumentTitle, useScrollTop, useDidMount} from "../../../hooks/index.js";
import {CheckOutlined, LoadingOutlined} from "@ant-design/icons";
import {resetPassword} from "../../../redux/actions/authActions.js";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import CustomInput from "../../../components/formik/CustomInput.jsx";
import {history} from "../../../routers/AppRouter.jsx";
import {HOME} from "../../../routers/routes.js";

const EmailSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email của bạn không hợp lệ!")
        .required("Bắt buộc cần điền email!")
});

const ResetPassword = () => {
    const {authStatus, isAuthenticating} = useSelector((state) => ({
        isAuthenticating: state.app.isAuthenticating,
        authStatus: state.app.authStatus
    }));
    const [forgotPWStatus, setForgotPWStatus] = useState({});
    const [isSending, setIsSending] = useState(false);
    const dispatch = useDispatch();
    const didMount = useDidMount();

    useScrollTop();
    useDocumentTitle("Reset Password");

    useEffect(() => {
        if (didMount) {
            setForgotPWStatus(authStatus);
            setIsSending(isAuthenticating);
        }
    }, [forgotPWStatus, isSending]);

    const onSubmitEmail = (form) => {
        dispatch(resetPassword(form.email));
    };

    return (
        <div className='content'>
            <div className='forgot_password'>
                {forgotPWStatus?.message && (
                    <div>
                        <h5 className={`text-center ${authStatus?.success ? 'toast-success' : 'toast-error'}`}>
                            {forgotPWStatus.message}
                        </h5>
                        <br/>
                        <button
                            className="button auth-button"
                            type="submit"
                            onClick={() => history.push(HOME)}
                        >
                            Về trang chủ
                        </button>
                    </div>
                )}
                <h2>Đổi mật khẩu</h2>
                <p>Điền địa chỉ email mà bạn đã đăng kí để chúng tôi gửi một email xác nhận cho bạn...</p>
                <br/>
                <Formik initialValues={{email: ""}}
                        onSubmit={onSubmitEmail}
                        validateOnChange
                        validationSchema={EmailSchema}
                        >
                    {() => (
                        <Form>
                            <div>
                                <Field
                                    name='email'
                                    type='email'
                                    label='Email* : '
                                    placeholder='Địa chỉ email đăng kí'
                                    component={CustomInput}
                                />
                                <br/>
                                <div className='register-action'>
                                    <button
                                        className='button w-100-mobile'
                                        disabled={isSending || authStatus?.success}
                                        type='submit'
                                    >
                                        {isSending? <LoadingOutlined/> : <CheckOutlined/>}
                                        &nbsp;
                                        {isSending? 'Đang gửi...' : 'Gửi'}
                                    </button>
                                    <br/>
                                    <button
                                        className="button auth-button"
                                        type="submit"
                                        onClick={() => history.push(HOME)}
                                    >
                                        Về trang chủ
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ResetPassword;