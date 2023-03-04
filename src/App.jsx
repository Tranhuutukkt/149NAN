import React from 'react';
import PropType from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {Preloader} from "./components/common";
import AppRouter from "./routers/AppRouter.jsx";

const App = ({ store, persistor }) => (
    <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
            <AppRouter/>
        </PersistGate>
    </Provider>
);

App.propTypes = {
    store: PropType.any.isRequired,
    persistor: PropType.any.isRequired
};

export default App;
