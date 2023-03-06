import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DownOutlined, LoadingOutlined} from "@ant-design/icons";
import {signOut} from "../../redux/actions/authActions.js";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import defaultAvatar from "../../assets";

const UserAvatar = () => {
    const {profile, isAuthenticating} = useSelector((state) => ({
        profile: state.profile,
        isAuthenticating: state.app.isAuthenticating
    }));
    const userNav = useRef(null);
    const dispatch = useDispatch();

    const toggleDropdown = (e) => {
        const closest = e.target.closest('div.user-nav');

        try {
            if (!closest && userNav.current.classList.contains('user-sub-open')) {
                userNav.current.classList.remove('user-sub-open');
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        document.addEventListener('click', toggleDropdown);
        return () => document.removeEventListener('click', toggleDropdown);
    }, []);

    const onClickNav = () => {
        userNav.current.classList.toggle('user-sub-open');
    };

    return isAuthenticating? (
        <div className='user-nav'>
            <span>Đang đăng xuất</span>
            &nbsp;
            <LoadingOutlined/>
        </div>
    ) : (
        <div
            className='user-nav'
            onClick={onClickNav}
            onKeyDown={() => { }}
            ref={userNav}
            role='button'
            tabIndex={0}
        >
            <h5 className='text-overflow-ellipsis'>{profile.name}</h5>
            <div className='user-nav-img-wrapper'>
                <img
                    alt=''
                    className='user-nav-img'
                    src={profile.avatar || defaultAvatar[Math.floor(Math.random()*8)]}
                />
            </div>
            <div className="user-nav-sub">
                <h6
                    className='user-nav-sub-link margin-0 d-flex'
                    onClick={() => dispatch(signOut())}
                    role='presentation'
                >
                    Đăng xuất
                    <i className="fa-solid fa-right-from-bracket"></i>
                </h6>
            </div>
        </div>
    );
};

UserAvatar.propType = {
    profile: PropTypes.object.isRequired
};

export default withRouter(UserAvatar);