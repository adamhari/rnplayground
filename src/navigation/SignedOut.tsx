import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default () => (
		<Stack.Screen name={"Login"} component={LoginScreen} />
);
