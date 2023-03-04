import React, {useEffect, useState} from "react";
import {useDocumentTitle, useScrollTop} from "../../../../hooks/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, withRouter} from "react-router-dom";
import {LOGIN, SIGNUP_STEP1, SIGNUP_STEP3} from "../../../../routers/routes.js";
import {getAllUser} from "../../../../redux/actions/userActions.js";
import * as Yup from "yup";
import StepTracker from "../../../../components/common/StepTracker.jsx";
import {Field, Form, Formik} from "formik";
import CustomInput from "../../../../components/formik/CustomInput.jsx";
import {displayActionMessage} from "../../../../helpers/utils.js";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";

const EmailSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email của bạn không hợp lệ!")
        .required("Bắt buộc cần điền email!")
});

const EmailSelect = () => {
    useDocumentTitle('Register Step 2');
    useScrollTop();
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickPrevious = () => history.push(SIGNUP_STEP1);
    const onClickNext = () => history.push(SIGNUP_STEP3);
    const [enable, setEnable] = useState(!!window.localStorage.getItem("email"));
    const registerLabel = ["Họ và tên", "Email", "Mật khẩu"];

    const store = useSelector((state) => ({
        users: state.users,
    }));

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    const dataEmailList = store.users?.users?.map(u => u.email) || [];
    const name = window.localStorage.getItem("name");

    const onFormSubmit = (form) => {
        const email = form.email.trim().toLowerCase();
        if (dataEmailList.includes(email)){
            setEnable(false);
            displayActionMessage("Email này đã được đăng kí. Nhập email khác hoặc quay lại để đăng nhập!")
        }
        else {
            window.localStorage.setItem("email", email);
            setEnable(true);
        }

    };

    return (
        <div className="register">
            <StepTracker current={2} label={registerLabel}/>
            <div className="auth-main">
                <h3>Xin chào {name}!</h3>
                <h3>Điền email của bạn để tiếp tục đăng kí.</h3>
                <h5>Email của bạn được dùng để xác nhận nên hãy điền thật chính xác.</h5>
                <Formik
                    initialValues={{email: window.localStorage.getItem("email") || ""}}
                    onSubmit={onFormSubmit}
                    validateOnChange
                    validationSchema={EmailSchema}
                >
                    {() => (
                        <Form>
                            <div>
                                <Field
                                    name='email'
                                    type='email'
                                    label='Email *: '
                                    placeholder='test@example.com'
                                    component={CustomInput}
                                />
                                <br/>
                                <div className="auth-action auth-action-signup">
                                    <button className="button auth-button" type='submit'>OK
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
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
                <button
                    className="button"
                    onClick={onClickNext}
                    type="submit"
                    disabled={!enable}
                >
                    Next Step
                    &nbsp;
                    <ArrowRightOutlined />
                </button>
            </div>
        </div>
    )
}

export default withRouter(EmailSelect);