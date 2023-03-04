import React from 'react';
import {Preloader} from "./components/common";
import { render } from 'react-dom';
import WebFont from 'webfontloader';
import App from './App';
import firebase from "./services/firebase.js";
import configureStore from "./redux/store/store";
import {onAuthStateFail, onAuthStateSuccess} from "./redux/actions/authActions.js";
import "normalize.css/normalize.css";
import "./styles/style.scss";
import "@fortawesome/fontawesome-free/css/all.css";

WebFont.load({
    google: {
        families: ['Roboto']
    }
});

const { store, persistor } = configureStore();

const root = document.getElementById('root');
render(<Preloader/>, root);

firebase.auth.onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(onAuthStateSuccess(user));
    } else {
        store.dispatch(onAuthStateFail('Failed to authenticate'));
    }
    // then render the app after checking the auth state
    render(<App store={store} persistor={persistor} />, root);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/149nan/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}