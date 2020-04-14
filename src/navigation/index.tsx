import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen';
import SignedIn from './SignedIn';

export type RootStackParamList = {
	Login: {},
	SignedIn: {}
};

const Stack = createStackNavigator<RootStackParamList>();

export default () => (
	<Stack.Navigator headerMode={'none'}>
		<Stack.Screen name={"Login"} component={LoginScreen} />
		<Stack.Screen name={"SignedIn"} component={SignedIn} options={{gestureEnabled: false}} />
	</Stack.Navigator>
)
