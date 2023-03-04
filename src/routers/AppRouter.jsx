import {createBrowserHistory} from "history";
import {Router, Switch, Route} from "react-router-dom";
import React from "react";
import {Navigation, Footer} from "../components/common"
import * as view from "../views";
import * as ROUTES from "./routes";
import ClientRoute from "./ClientRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <>
            <Navigation/>
            <Switch>
                <ClientRoute
                    component={view.Home}
                    exact
                    path={ROUTES.HOME}
                />
                <PublicRoute
                    component={view.SignIn}
                    exact
                    path={ROUTES.LOGIN}
                />
                <PublicRoute
                    component={view.RegisterStep1}
                    exact
                    path={ROUTES.SIGNUP_STEP1}
                />
                <PublicRoute
                    component={view.RegisterStep2}
                    exact
                    path={ROUTES.SIGNUP_STEP2}
                />
                <PublicRoute
                    component={view.RegisterStep3}
                    exact
                    path={ROUTES.SIGNUP_STEP3}
                />
                <Route
                    component={view.EmailVerified}
                    exact
                    path={ROUTES.EMAIL_VERIFIED}
                />
                <PublicRoute component={view.PageNotFound}/>
            </Switch>
            <Footer/>
        </>
    </Router>
);

export default AppRouter;