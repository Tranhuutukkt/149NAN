import {useScrollTop, useDocumentTitle} from "../../../../hooks";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, withRouter} from "react-router-dom";
import {LOGIN, SIGNUP_STEP2} from "../../../../routers/routes.js";
import StepTracker from "../../../../components/common/StepTracker.jsx";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {getAllUser} from "../../../../redux/actions/userActions.js";
import {displayActionMessage} from "../../../../helpers/utils.js";
import {ArrowRightOutlined} from "@ant-design/icons";

const NameSelect = () => {
    useDocumentTitle('Register Step 1');
    useScrollTop();
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickPrevious = () => history.push(LOGIN);
    const onClickNext = () => history.push(SIGNUP_STEP2);

    const store = useSelector((state) => ({
        users: state.users,
    }));
    const [enable, setEnable] = useState(!!window.localStorage.getItem("name"));

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    const dataNameList = store.users?.users?.map(u => u.name) || [];

    const nameList = [
        {value: "Trần Hữu An", label: "Trần Hữu An"},
        {value: "Bùi Hoàng Anh", label: "Bùi Hoàng Anh"},
        {value: "Lương Đức Dương", label: "Lương Đức Dương"},
        {value: "Trần Ngọc Sơn", label: "Trần Ngọc Sơn"},
        {value: "Bùi Anh Tuấn", label: "Bùi Anh Tuấn"},
        {value: "Nguyễn Viết Trường", label: "Nguyễn Viết Trường"},
    ];
    const registerLabel = ["Họ và tên", "Email", "Mật khẩu"];

    const onSelectedName = (value) => {
        const name = value.value;
        if (dataNameList.includes(name)){
            setEnable(false);
            displayActionMessage("Tài khoản của bạn đã tồn tại, quay lại để đăng nhập.")
        }
        else {
            window.localStorage.setItem("name", name);
            setEnable(true);
        }
    }

    return(
        <div className="register">
            <StepTracker current={1} label={registerLabel}/>
            <div className="register-step-1">
                <h3 className="text-center">Chọn tên của bạn: </h3>
                <Select
                    placeholder="Chọn tên: "
                    defaultValue={nameList[nameList.findIndex(i => i.value === window.localStorage.getItem("name"))]}
                    onChange={onSelectedName}
                    options={nameList}
                    styles={{
                        menu: (provided) => ({...provided, zIndex: 6})
                }}
                />
                <br/>
                <div className="register-action">
                    <button
                        className="button button-muted"
                        onClick={onClickPrevious}
                        type="button"
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
        </div>
    );
};

export default withRouter(NameSelect);