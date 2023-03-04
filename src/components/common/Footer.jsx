import logo from "../../assets/logoWordmark.png";
import React from "react";
import {useLocation} from "react-router-dom";
import * as Route from '../../routers/routes';

const Footer = () => {
  const {pathname} = useLocation();

  const visibleOnlyPath = [
      Route.HOME,
      Route.LOGIN,
      Route.SIGNUP_STEP1,
      Route.SIGNUP_STEP2,
      Route.SIGNUP_STEP3
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (
      <footer className="footer">
          <div className="footer-col-1">
              <strong>
                  <span>
                      Developed by {" "} T.H.A</span>
              </strong>
          </div>
          <div className="footer-col-2">
              <img alt="Footer logo" className="footer-logo" src={logo}/>
              <h5>
                  <i className="fa-solid fa-copyright"></i>
                  &nbsp;
                  {new Date().getFullYear()}
              </h5>
          </div>
          <div className="footer-col-3">
              <strong>
                  <span>149 Nguyen An Ninh, Ha Noi</span>
              </strong>
          </div>
      </footer>
  );
};

export default Footer;