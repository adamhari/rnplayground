import React, {useRef} from 'react';
import {Animated, Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const TARGET_SIZE = 48;

type TargetProps = {
	onPress: () => void
}

const getRandomPosition = (xAxis: boolean): number => {
	const axis = xAxis ? screenWidth : screenHeight;
	let randomPosition = Math.round(Math.random() * axis);
	if (randomPosition < TARGET_SIZE) randomPosition += TARGET_SIZE;
	if (randomPosition > axis - TARGET_SIZE) randomPosition -= TARGET_SIZE;
	return randomPosition;
};

export default ({onPress}: TargetProps) => {
	const translateValue = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

	const moveTarget = () => {
		const translateAnim = Animated.timing(translateValue, {
			toValue: {
				x: getRandomPosition(true),
				y: getRandomPosition(false)
			},
			duration: 1000,
			useNativeDriver: true
		});
		translateAnim.start()
	};

	const translateInterval = useRef(setInterval(moveTarget, 1000));

	const handlePress = () => {
		onPress();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.5}
				onPressIn={handlePress}
			>
				<Animated.View
					style={[
						styles.targetOuter,
						{
							transform: [
								{translateX: translateValue.x},
								{translateY: translateValue.y}
							]
						}
					]}
				>
					<View style={styles.targetMiddle}>
						<View style={styles.targetInner} />
					</View>
				</Animated.View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject
	},
	targetOuter: {
		width: TARGET_SIZE,
		height: TARGET_SIZE,
		borderRadius: TARGET_SIZE / 2,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
	targetMiddle: {
		width: TARGET_SIZE / 1.5,
		height: TARGET_SIZE / 1.5,
		borderRadius: TARGET_SIZE / 3,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	targetInner: {
		width: TARGET_SIZE / 3,
		height: TARGET_SIZE / 3,
		borderRadius: TARGET_SIZE / 6,
		backgroundColor: 'red'
	}
});
