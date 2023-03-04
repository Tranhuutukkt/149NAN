import {Redirect, Route} from "react-router-dom";
import React from "react";
import {EMAIL_VERIFIED, LOGIN} from "./routes.js";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const ClientRoute = ({isAuth, emailVerified, component: Component, ...rest}) => (
    <Route
        {...rest}
        component={(props) => {
            if (isAuth && emailVerified) {
                return (
                    <main className="content">
                        <Component {...props}/>
                    </main>
                );
            }
            if (isAuth && emailVerified === false) {
                return <Redirect to={EMAIL_VERIFIED}/>;
            }

            return (
                <Redirect to={{
                    pathname:LOGIN,
                    state: {from: props.location}
                }}/>
            );
        }}
    />
);

ClientRoute.defaultProps = {
    isAuth: false,
    emailVerified: false
}

ClientRoute.prototype = {
    isAuth: PropTypes.bool,
    emailVerified: PropTypes.bool,
    component: PropTypes.func.isRequired,
    rest: PropTypes.any
};

const mapStateToProps = ({auth}) => ({
    isAuth: !!auth,
    emailVerified: auth?.emailVerified || false
});

export default connect(mapStateToProps)(ClientRoute);