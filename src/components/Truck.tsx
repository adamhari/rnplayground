import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {AnimationState, Easing, TimingConfig} from 'react-native-reanimated';
import {loop} from 'react-native-redash';

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
	multiply,
	sub,
	add
} = Animated;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const TRUCK_WIDTH = 80;
const TRUCK_HEIGHT = 40;

class Exhaust extends Component {

	clock: Animated.Clock;
	anim: Animated.Value<number>;

	constructor(props: TruckProps) {
		super(props);

		this.clock = new Clock();

		// this.translateX = this.animateTranslateX(this.clock, 0, -TRUCK_WIDTH);
		this.anim = new Value(0);
	}

	animateTranslateX = (clock: Animated.Clock, value: number, dest: number) => {
		const state = {
			finished: new Value(0),
			position: new Value(0),
			time: new Value(0),
			frameTime: new Value(0),
		};

		const config = {
			duration: 2500,
			toValue: new Value(0),
			easing: Easing.inOut(Easing.ease),
		};

		return block([
			cond(
				clockRunning(clock),
				[
					// if the clock is already running we update the toValue, in case a new dest has been passed in
					set(config.toValue, dest),
				],
				[
					// if the clock isn't running we reset all the animation params and start the clock
					set(state.finished, 0),
					set(state.time, 0),
					set(state.position, value),
					set(state.frameTime, 0),
					set(config.toValue, dest),
					startClock(clock),
				]
			),
			// we run the step here that is going to update position
			timing(clock, state, config),
			// if the animation is over we stop the clock
			cond(state.finished, debug('stop clock', stopClock(clock))),
			// we made the block return the updated position
			state.position,
		]);
	};

	render() {
		return (
			<View style={styles.truckExhaust}>
				<Animated.Code>
					{() =>
						set(
							this.anim,
							loop({
								duration: 250,
								autoStart: true
							})
						)
					}
				</Animated.Code>
				<Animated.View
					style={[
						styles.truckExhaustSmoke,
						{
							transform: [
								{translateX: multiply(this.anim, -25)},
								{scale: add(0.5, this.anim)}
							],
							opacity: sub(1, this.anim)
						}
					]}
				/>
			</View>
		)
	}
}

type TruckProps = {
	onPress: () => void
};

export default class Truck extends Component<TruckProps> {

	translateX: Animated.Value<number>;
	animConfig: TimingConfig;
	anim: AnimationState;

	constructor(props: TruckProps) {
		super(props);
		this.translateX = new Value(-TRUCK_WIDTH);
		this.animConfig = {
			duration: 2500,
			toValue: SCREEN_WIDTH - TRUCK_WIDTH,
			easing: Easing.inOut(Easing.ease)
		};
		this.anim = timing(this.translateX, this.animConfig);
	}

	componentDidMount() {
		this.anim.start();
	}

	renderWheel = () => (
		<View style={styles.truckTire}>
			<View style={styles.truckWheel} />
		</View>
	);

	render() {
		return (
			<Animated.View style={[styles.container, {transform:[{translateX: this.translateX}]}]}>
				<View style={styles.truck}>
					<Exhaust />
					<View style={styles.truckBack}>
						{this.renderWheel()}
					</View>
					<View style={styles.truckFront}>
						<View style={styles.truckCab} />
						{this.renderWheel()}
					</View>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		top: 25
	},
	truck: {
		flexDirection: 'row',
		width: TRUCK_WIDTH,
		height: TRUCK_HEIGHT
	},
	truckFront: {
		flex: 2,
		backgroundColor: 'red',
		borderBottomRightRadius: TRUCK_WIDTH / 16,
		borderTopRightRadius: TRUCK_WIDTH / 8
	},
	truckBack: {
		flex: 3,
		backgroundColor: 'brown',
		borderBottomLeftRadius: TRUCK_WIDTH / 32,
		borderTopLeftRadius: TRUCK_WIDTH / 32
	},
	truckExhaust: {
		position: 'absolute',
		bottom: TRUCK_WIDTH / 32,
		left: -TRUCK_WIDTH / 32,
		width: TRUCK_WIDTH / 32,
		height: TRUCK_WIDTH / 16,
		backgroundColor: 'gray'
	},
	truckExhaustSmoke: {
		width: TRUCK_WIDTH / 16,
		height: TRUCK_WIDTH / 16,
		borderRadius: TRUCK_WIDTH / 32,
		left: -(TRUCK_WIDTH / 16),
		backgroundColor: 'lightgray'
	},
	truckCab: {
		position: 'absolute',
		top: TRUCK_WIDTH / 10,
		left: TRUCK_WIDTH / 9,
		width: TRUCK_WIDTH / 6,
		height: TRUCK_WIDTH / 7,
		borderTopRightRadius: TRUCK_WIDTH / 32,
		backgroundColor: 'white'
	},
	truckTire: {
		position: 'absolute',
		bottom: -TRUCK_WIDTH / 12,
		left: TRUCK_WIDTH / 12,
		width: TRUCK_WIDTH / 4,
		height: TRUCK_WIDTH / 4,
		borderRadius: TRUCK_WIDTH / 8,
		backgroundColor: 'black',

		alignItems: 'center',
		justifyContent: 'center'
	},
	truckWheel: {
		width: TRUCK_WIDTH / 10,
		height: TRUCK_WIDTH / 10,
		borderRadius: TRUCK_WIDTH / 6,
		backgroundColor: 'white',
	}
});
