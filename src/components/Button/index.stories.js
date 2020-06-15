import React from 'react';

import { storiesOf } from '@storybook/react-native';
import {withKnobs, boolean, number, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'

import CenterView from '../../../storybook/decorators/CenterView';
import Button from '.';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
	.add('Button', () =>
		<Button
			activeOpacity={number("Active Opacity", 0.5)}
			disabled={boolean("Disabled")}
			label={text("Label", "Button")}
			onLongPress={action("Button Long Pressed")}
			onPress={action("Button Pressed")}
			style={{
				backgroundColor: text("Background Color", "#CCCCCC"),
				borderRadius: number("Border Radius", 5),
				paddingVertical: number("Vertical Padding", 10),
				paddingHorizontal: number("Horizontal Padding", 30)
			}}
			textStyle={{
				color: text("Font Color", "#000000"),
				fontFamily: text("Font Family"),
				fontSize: text("Font Size", 16),
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
						'500'
					)
			}}
		/>
	);
