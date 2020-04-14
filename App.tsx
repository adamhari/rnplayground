import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './src/store';
import Navigation from './src/navigation';


export default () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar barStyle="dark-content" />
                <Navigation />
            </NavigationContainer>
        </Provider>
    );
};
