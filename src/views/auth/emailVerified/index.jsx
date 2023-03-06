import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDocumentTitle, useScrollTop} from "../../../hooks/index.js";
import {useHistory, withRouter} from "react-router-dom";
import {mailVerified, onAuthStateSuccess} from "../../../redux/actions/authActions.js";
import {HOME} from "../../../routers/routes.js";

const EmailVerified = () => {
    const store = useSelector((state) => ({
        user: state.auth
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    useDocumentTitle("Email Verification");
    useScrollTop();

    const onSendEmail = () => {
        dispatch(mailVerified());
        history.push(HOME);
    }

    return (
        <div className='content'>
            <div className='auth-content'>
                <h3>Email đăng kí của bạn ({store?.user?.email || " "}) hiện
                    {store.user.emailVerified ? " đã":" chưa"} được xác nhận.</h3>
                {!store.user.emailVerified && (
                    <h3>Mở email xác nhận (có thể trong mục Spam/Thư rác) để tiếp tục sử dụng trang web.</h3>)}
                <br/>
                <div className="auth-field auth-action">
                    <button
                        className="button auth-button"
                        type="submit"
                        disabled={store?.user?.emailVerified || false}
                        onClick={onSendEmail}
                    >
                        Nhận thư
                    </button>
                    <button
                        className="button auth-button"
                        type="submit"
                        disabled={!store?.user?.emailVerified || false}
                        onClick={() => history.push(HOME)}
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(EmailVerified);