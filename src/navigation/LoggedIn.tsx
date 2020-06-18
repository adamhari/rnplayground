import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {DrawerActions, RouteProp} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerNavigationProp} from "@react-navigation/drawer";
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

export type LoggedInDrawerStackParamList = {
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
			<DrawerItem
				label="Home"
				labelStyle={styles.drawerLabel}
				onPress={() => handlePress('Home')}
				icon={({focused, color, size}) => <Icon name={'home'} color={color} size={size} style={styles.drawerIcon} />}
				activeTintColor={'red'}
				inactiveTintColor={'white'}
			/>
			<DrawerItem
				label="Another"
				labelStyle={styles.drawerLabel}
				onPress={() => handlePress('Another')}
				icon={({focused, color, size})  => <Icon name={'picture'} color={color} size={size} style={styles.drawerIcon} />}
				activeTintColor={'red'}
				inactiveTintColor={'white'}
			/>
			<DrawerItem
				label="Logout"
				labelStyle={styles.drawerLabel}
				onPress={() => props.navigation.navigate('LoggedOut')}
				icon={({focused, color, size})  => <Icon name={'logout'} color={color} size={size} style={styles.drawerIcon} />}
				activeTintColor={'red'}
				inactiveTintColor={'white'}
			/>
		</DrawerContentScrollView>
	);
};

type DrawerScreenContainerRouteProp = RouteProp<LoggedInDrawerParamList, 'Screens'>
type DrawerScreenContainerNavigationProp = DrawerNavigationProp<LoggedInDrawerParamList, 'Screens'>;
type DrawerScreenContainerNavigationProps = {
	route: DrawerScreenContainerRouteProp,
	navigation: DrawerScreenContainerNavigationProp
};
type DrawerScreenContainerProps = DrawerScreenContainerNavigationProps & {
	scale: Animated.Node<number>,
	borderRadius: Animated.Node<number>,
	rotateY: Animated.Node<number>
};

const DrawerScreenContainer = ({scale, borderRadius, rotateY, ...props}: DrawerScreenContainerProps) => (
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
);

export default () => {
	const [progress, setProgress] = React.useState(new Animated.Value(0));
	const inputRange = [0, 1];
	const scale = Animated.interpolate(progress, {
		inputRange,
		outputRange: [1, 0.8],
	});
	const borderRadius = Animated.interpolate(progress, {
		inputRange,
		outputRange: [0, 16],
	});
	const rotateY = Animated.interpolate(progress, {
		inputRange,
		outputRange: [0, -15]
	});

	return (
		<LinearGradient
			style={{flex: 1}}
			colors={['deepskyblue', 'lightskyblue']}
			start={{x: 0, y: 0}}
			end={{x: 1, y: 1}}
		>
			<Drawer.Navigator
				drawerType="slide"
				overlayColor="transparent"
				drawerStyle={styles.drawer}
				sceneContainerStyle={{backgroundColor: 'transparent'}}
				drawerContent={(props: DrawerContentComponentProps) => {
					setProgress(props.progress);
					return <DrawerContent {...props} />;
				}}
			>
				<Drawer.Screen name={'Screens'}>
					{
						(props) => (
							<DrawerScreenContainer
								{...props}
								scale={scale}
								borderRadius={borderRadius}
								rotateY={rotateY}
							/>
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
	},
	drawerLabel: {
		fontWeight: 'bold',
		marginLeft: -8
	},
});
