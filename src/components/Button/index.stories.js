import React from 'react';

import { storiesOf } from '@storybook/react-native';
import {withKnobs, boolean, number, text} from '@storybook/addon-knobs';
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
				backgroundColor: text("Button Color", "#CCCCCC"),
				borderRadius: number("Border Radius", 5),
				paddingVertical: number("Vertical Padding", 10),
				paddingHorizontal: number("Horizontal Padding", 30)
			}}
			textStyle={{
				color: text("Text Color", "#000000")
			}}
		/>
	);
