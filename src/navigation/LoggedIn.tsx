import React from "react";
import {Dimensions, StatusBar, StyleSheet} from "react-native";
import {DrawerActions} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {DrawerContentComponentProps} from "@react-navigation/drawer/lib/typescript/src/types";
import Animated, {concat} from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from '../screens/Home';
import Another from '../screens/Another';


type LoggedInDrawerParamList = {
	Screens: {}
};

const Drawer = createDrawerNavigator<LoggedInDrawerParamList>();

type LoggedInDrawerStackParamList = {
	Home: {},
	Another: {}
}

const Stack = createStackNavigator<LoggedInDrawerStackParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => {
	const handlePress = (routeName: string) => {
		const {navigation} = props;
		navigation.reset({index: 0, routes: [{name: routeName}]});
		navigation.dispatch(DrawerActions.closeDrawer());
	};

	return (
		<DrawerContentScrollView {...props} scrollEnabled={false} style={styles.drawerContentContainer}>
			<StatusBar animated={true} barStyle={'dark-content'} />
			<DrawerItem
				label="Home"
				labelStyle={styles.drawerLabel}
				onPress={() => handlePress('Home')}
				icon={() => <Icon name={'home'} size={18} style={styles.drawerIcon} />}
			/>
			<DrawerItem
				label="Another"
				labelStyle={styles.drawerLabel}
				onPress={() => handlePress('Another')}
				icon={() => <Icon name={'picture'} size={18} style={styles.drawerIcon} />}
			/>
			<DrawerItem
				label="Logout"
				labelStyle={styles.drawerLabel}
				onPress={() => props.navigation.navigate('LoggedOut')}
				icon={() => <Icon name={'logout'} size={18} style={styles.drawerIcon} />}
			/>
		</DrawerContentScrollView>
	);
};

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
	const rotateY = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [0, -15]
	});

	return (
		<LinearGradient
			style={{flex: 1}}
			colors={['deepskyblue', 'lightskyblue']}
			start={{x: 0, y: 0}}
			end={{x: 0, y: 1}}
		>
			<Drawer.Navigator
				drawerType="slide"
				overlayColor="transparent"
				drawerStyle={styles.drawer}
				sceneContainerStyle={{backgroundColor: 'transparent'}}
				drawerContent={(props: DrawerContentComponentProps) => {s
					setProgress(props.progress);
					return <DrawerContent {...props} />;
				}}
			>
				<Drawer.Screen name={'Screens'}>
					{
						props => (
							<Animated.View
								style={
									StyleSheet.flatten([
										styles.outerStack,
										{
											transform: [
												{scale},
												{rotateY: concat(rotateY, 'deg')},
											]
										}
									])
								}
							>
								<Animated.View style={StyleSheet.flatten([styles.innerStack, {borderRadius}])}>
									<Stack.Navigator
										headerMode={'none'}
										screenOptions={{
											gestureEnabled: false,
											gestureDirection: 'horizontal-inverted'
										}}
									>
										<Stack.Screen name={'Home'} component={Home} />
										<Stack.Screen name={'Another'} component={Another} />
									</Stack.Navigator>
								</Animated.View>
							</Animated.View>
						)
					}
				</Drawer.Screen>
			</Drawer.Navigator>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	outerStack: {
		flex: 1,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: 8,
		elevation: 5
	},
	innerStack: {
		flex: 1,
		overflow: 'hidden',
	},
	drawer: {
		flex: 1,
		width: '50%',
		backgroundColor: 'transparent'
	},
	drawerContentContainer: {
		flex: 1,
		marginVertical: Dimensions.get('screen').height / 8,
	},
	drawerIcon: {
		color: 'black'
	},
	drawerLabel: {
		color: 'black',
		fontWeight: 'bold',
		marginLeft: -8
	},
});
