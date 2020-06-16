import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {NavigationContainer} from '@react-navigation/native';

import store, {persistor} from './src/store';
import Navigation from './src/navigation';

export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
                <StatusBar barStyle="dark-content" />
                <Navigation />
            </NavigationContainer>
        </PersistGate>
    </Provider>
);
