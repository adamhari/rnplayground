import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {AnimationState, Easing, TimingConfig} from 'react-native-reanimated';

const {
	Clock,
	Value,
	set,
	cond,
	startClock,
	clockRunning,
	timing,
	debug,
	stopClock,
	block,
} = Animated;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const TRUCK_WIDTH = 80;
const TRUCK_HEIGHT = 40;

type TruckProps = {
	onPress: () => void
};

export default class Truck extends Component<TruckProps> {

	translateX: Animated.Value<number>;
	animConfig: TimingConfig;
	anim: AnimationState;

	constructor(props: TruckProps){
		super(props);
		this.translateX = new Value(-TRUCK_WIDTH);
		this.animConfig = {
			duration: 2500,
			toValue: SCREEN_WIDTH + TRUCK_WIDTH,
			easing: Easing.inOut(Easing.ease)
		};
		this.anim = timing(this.translateX, this.animConfig);
	}

	componentDidMount(){
		this.anim.start();
	}

	render() {
		return (
			<Animated.View style={[styles.container, {transform:[{translateX: this.translateX}]}]}>
				<View style={styles.truck}>
					<View style={styles.truckFront}>
					</View>
					<View style={styles.truckBack}>
					</View>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
	},
	truck: {
		flexDirection: 'row',
		width: TRUCK_WIDTH,
		height: TRUCK_HEIGHT
	},
	truckFront: {
		flex: 1,
		backgroundColor: 'red',
	},
	truckBack: {
		flex: 1,
		backgroundColor: 'blue'
	}
});
