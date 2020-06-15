import React from 'react';

import { storiesOf } from '@storybook/react-native';
import {withKnobs, number, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'

import CenterView from '../../../storybook/decorators/CenterView';
import Button, {ButtonStyles, TextStyles} from '.';

const sharedKnobs = () => ({
	activeOpacity: number("Active Opacity"),
	label: text("Label", "Button"),
	onLongPress: action("Button Long Pressed"),
	onPress: action("Button Pressed"),
	style: {
			backgroundColor: text("Background Color", ButtonStyles.backgroundColor),
			borderRadius: number("Border Radius", ButtonStyles.borderRadius),
			paddingVertical: number("Vertical Padding", ButtonStyles.paddingVertical),
			paddingHorizontal: number("Horizontal Padding", ButtonStyles.paddingHorizontal)
	},
	textStyle: {
			color: text("Font Color", TextStyles.color),
			fontFamily: text("Font Family", TextStyles.fontFamily),
			fontSize: text("Font Size", TextStyles.fontSize),
			fontWeight: select(
				"Font Weight",
				{
					'100': '100',
					'200': '200',
					'300': '300',
					'400': '400',
					'500': '500',
					'600': '600',
					'700': '700',
					'800': '800',
					'900': '900',
				},
				TextStyles.fontWeight
		)
	}
});

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
	.add('Active', () =>
		<Button
			{...sharedKnobs()}
			disabled={false}
		/>
	)
	.add('Disabled', () =>
		<Button
			{...sharedKnobs()}
			disabled={true}
		/>
	);
