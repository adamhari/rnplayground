import React from 'react';
import { ActivityIndicator } from 'react-native';

interface SpinnerProps {
	animating: boolean,
	color: string,
	size: number | 'small' | 'large'
}

export default ({ animating, color, size }: SpinnerProps) => <ActivityIndicator animating={animating} color={color} size={size} />;
