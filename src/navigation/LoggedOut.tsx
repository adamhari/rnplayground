import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Login from '../screens/Login';

export type LoggedOutStackParamList = {
	Login: {}
};

const Stack = createStackNavigator<LoggedOutStackParamList>();

export default () => (
	<Stack.Navigator headerMode={'none'}>
		<Stack.Screen name={'Login'} component={Login} />
	</Stack.Navigator>
);
