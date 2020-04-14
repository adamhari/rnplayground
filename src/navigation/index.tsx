import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';

export type RootStackParamList = {
	LoggedOut: {},
	LoggedIn: {}
};

const Stack = createStackNavigator<RootStackParamList>();

export default () => (
	<Stack.Navigator headerMode={'none'} screenOptions={{gestureEnabled: false}}>
		<Stack.Screen name={"LoggedOut"} component={LoggedOut} />
		<Stack.Screen name={"LoggedIn"} component={LoggedIn} />
	</Stack.Navigator>
)
