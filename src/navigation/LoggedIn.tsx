import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Home from '../screens/Home';
import Another from '../screens/Another';

export type LoggedInDrawerParamList = {
	Home: {},
	Another: {}
};

const Drawer = createDrawerNavigator<LoggedInDrawerParamList>();

export default () => (
	<Drawer.Navigator>
		<Drawer.Screen name={'Home'} component={Home} />
		<Drawer.Screen name={'Another'} component={Another} />
	</Drawer.Navigator>
);
