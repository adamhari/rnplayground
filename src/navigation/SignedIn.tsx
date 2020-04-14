import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from '../screens/HomeScreen';

type DrawerScreenParams = {
	Home: {}
};

const Drawer = createDrawerNavigator<DrawerScreenParams>();

export default () => (
	<Drawer.Navigator>
		<Drawer.Screen name={'Home'} component={HomeScreen} />
	</Drawer.Navigator>
);
