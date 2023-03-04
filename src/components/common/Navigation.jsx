import React, {useEffect, useRef} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import logo from "../../assets/logoWordmark.png";
import * as ROUTE from "../../routers/routes";
import {useSelector} from "react-redux";


const Navigation = () => {
    const navbar = useRef(null);
    const pathname = useLocation();

    const store = useSelector((state) => ({
        user: state.auth,
        isAuthenticating: state.app.isAuthenticating,
        isLoading: state.app.loading
    }));
    const scrollHandler = () => {
        if (navbar.current && window.screen.width > 480) {
            if (window.pageYOffset >= 70) {
                navbar.current.classList.add('is-nav-scrolled');
            } else {
                navbar.current.classList.remove('is-nav-scrolled');
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    const onClickLink = (e) => {
        if (store.isAuthenticating) e.preventDefault();
    }

    return (
        <nav className="navigation" ref={navbar}>
            <div className="logo">
                <Link onClick={onClickLink} to={ROUTE.HOME}><img alt="Logo" src={logo} /></Link>
            </div>
            <ul className="navigation-menu-main">
                {
                 <div>
                     <li><NavLink activeClassName="navigation-menu-active" exact to={ROUTE.HOME}>Trang chủ</NavLink></li>
                 </div>
                }
            </ul>
            <ul className="navigation-menu">
                <li className="navigation-menu-item">User Avatar</li>
            </ul>
        </nav>
    );
};

export default Navigation;