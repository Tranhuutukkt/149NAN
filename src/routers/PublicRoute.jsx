import {Redirect, Route} from "react-router-dom";
import React from "react";
import {LOGIN} from "./routes.js";
import PropType from "prop-types";
import {connect} from "react-redux";

const PublicRoute = ({isAuth, component: Component, path, ...rest}) => (
    <Route
        {...rest}
        // eslint-disable-next-line consistent-return
        render={(props) => {
            // eslint-disable-next-line react/prop-types
            const { from } = props.location.state || { from: { pathname: '/' } };

            if ((isAuth) && (path === LOGIN)) {
                return <Redirect to={from} />;
            }

            return (
                <main className="content">
                    <Component {...props} />
                </main>
            );
        }}
    />
);

PublicRoute.defaultProps = {
    isAuth: false,
    path: '/149nan/'
};

PublicRoute.propTypes = {
    isAuth: PropType.bool,
    component: PropType.func.isRequired,
    path: PropType.string,
    // eslint-disable-next-line react/require-default-props
    rest: PropType.any
};

const mapStateToProps = ({ auth }) => ({
    isAuth: !!auth
});

export default connect(mapStateToProps)(PublicRoute);