import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import SignedOutNavigation from './SignedOut';
import SignedInNavigation from './SignedIn';

const Stack = createStackNavigator();

export default () => (
	<Stack.Navigator headerMode={'none'}>
		{/*{SignedOutNavigation()}*/}
		<Stack.Screen name={"SignedInNavigation"} component={SignedInNavigation} />
	</Stack.Navigator>
)
