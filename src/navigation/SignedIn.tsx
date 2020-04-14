import React from "react";
import {StyleSheet} from "react-native";
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => (
	<Animated.View style={StyleSheet.flatten([styles.stack, style])}>
		<Stack.Navigator headerMode={'none'}>
			<Stack.Screen name="Home">{props => <HomeScreen {...props} />}</Stack.Screen>
		</Stack.Navigator>
	</Animated.View>
);

const DrawerContent = props => (
	<DrawerContentScrollView {...props} scrollEnabled={false}>
		<DrawerItem
			label="Home"
			labelStyle={styles.drawerLabel}
			style={styles.drawerItem}
			onPress={() => props.navigation.navigate('Home')}
		/>
		<DrawerItem
			label="Logout"
			labelStyle={{ color: 'white' }}
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

	const animatedStyle = { borderRadius, transform: [{ scale }] };

	return (
		<LinearGradient style={{ flex: 1 }} colors={['#E94057', '#4A00E0']}>
			<Drawer.Navigator
				// hideStatusBar
				drawerType="slide"
				overlayColor="transparent"
				drawerStyle={styles.drawerStyles}
				drawerContentOptions={{
					activeBackgroundColor: 'transparent',
					activeTintColor: 'white',
					inactiveTintColor: 'white',
				}}
				sceneContainerStyle={{ backgroundColor: 'transparent' }}
				drawerContent={props => {
					setProgress(props.progress);
					return <DrawerContent {...props} />;
				}}>
				<Drawer.Screen name="Screens">
					{props => <Screens {...props} style={animatedStyle} />}
				</Drawer.Screen>
			</Drawer.Navigator>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	stack: {
		flex: 1,
		shadowColor: '#FFF',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		overflow: 'hidden'
	},
	drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
	drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
	drawerLabel: { color: 'white' },
	avatar: {
		borderRadius: 60,
		marginBottom: 16,
		borderColor: 'white',
		borderWidth: StyleSheet.hairlineWidth,
	},
});
