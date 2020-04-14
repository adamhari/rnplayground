import React from "react";
import {StyleSheet} from "react-native";
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {DrawerContentComponentProps} from "@react-navigation/drawer/lib/typescript/src/types";
import Animated from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';
import Home from '../screens/Home';
import Another from '../screens/Another';


type LoggedInDrawerParamList = {
	Screens: {}
};

const Drawer = createDrawerNavigator<LoggedInDrawerParamList>();

type DrawerStackParamList = {
	Home: {},
	Another: {}
}

const Stack = createStackNavigator<DrawerStackParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => (
	<DrawerContentScrollView {...props} scrollEnabled={false}>
		<DrawerItem
			label="Home"
			labelStyle={{}}
			onPress={() => props.navigation.navigate('Home')}
		/>
		<DrawerItem
			label="Another"
			labelStyle={{}}
			onPress={() => props.navigation.navigate('Another')}
		/>
		<DrawerItem
			label="Logout"
			labelStyle={{}}
			onPress={() => props.navigation.navigate('Login')}
		/>
	</DrawerContentScrollView>
);

export default () => {
	const [progress, setProgress] = React.useState(new Animated.Value(0));
	const scale = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [1, 0.8],
	});
	const borderRadius = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [0, 16],
	});

	const animatedStyle = {borderRadius, transform: [{scale}]};

	return (
		<LinearGradient style={{flex: 1}} colors={['#E94057', '#4A00E0']}>
			<Drawer.Navigator
				// hideStatusBar
				drawerType="slide"
				overlayColor="transparent"
				drawerStyle={styles.drawerStyles}
				sceneContainerStyle={{backgroundColor: 'transparent'}}
				drawerContent={(props: DrawerContentComponentProps) => {
					setProgress(props.progress);
					return <DrawerContent {...props} />;
				}}
			>
				<Drawer.Screen name={'Screens'}>
					{
						props => (
							<Animated.View style={StyleSheet.flatten([styles.stack, animatedStyle])}>
								<Stack.Navigator headerMode={'none'} screenOptions={{gestureEnabled: false}}>
									<Stack.Screen name={'Home'} component={Home} />
									<Stack.Screen name={'Another'} component={Another} />
								</Stack.Navigator>
							</Animated.View>
						)
					}
				</Drawer.Screen>
			</Drawer.Navigator>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	stack: {
		flex: 1,
		overflow: 'hidden',
		// shadowColor: '#FFF',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 0,
		// },
		// shadowOpacity: 0.5,
		// shadowRadius: 10,
		// elevation: 5,
	},
	drawerStyles: {
		flex: 1,
		width: '50%',
		backgroundColor: 'transparent'
	},
});
