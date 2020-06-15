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

export const ButtonStyles: ViewStyle = {
	backgroundColor: "#214fce",
	borderRadius: 5,
	paddingVertical: 10,
	paddingHorizontal: 30
};

export const TextStyles: TextStyle = {
	color: '#ffffff',
	fontSize: 16,
	fontWeight: "500"
};

export default ({ activeOpacity, disabled, icon, label, onLongPress, onPress, style, textStyle }: ButtonProps) => (
	<TouchableOpacity
		activeOpacity={activeOpacity || 0.5}
		disabled={disabled}
		onLongPress={onLongPress}
		onPress={onPress}
		style={[
			ButtonStyles,
			style,
			disabled && {backgroundColor: 'lightgray'}
		]}
	>
		{icon}
		<Text style={[TextStyles, textStyle]}>
			{label}
		</Text>
	</TouchableOpacity>
);
