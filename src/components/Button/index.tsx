import React, {ReactElement} from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';

interface ButtonProps {
	activeOpacity: number,
	disabled: boolean,
	icon: ReactElement,
	label: string,
	onLongPress: () => void,
	onPress: () => void,
	style: ViewStyle,
	textStyle: TextStyle
}

export default ({ activeOpacity, disabled, icon, label, onLongPress, onPress, style, textStyle }: ButtonProps) => (
	<TouchableOpacity
		activeOpacity={activeOpacity}
		disabled={disabled}
		onLongPress={onLongPress}
		onPress={onPress}
		style={style}
	>
		{icon}
		<Text style={textStyle}>{label}</Text>
	</TouchableOpacity>
);
