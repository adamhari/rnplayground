import React from 'react';

import { storiesOf } from '@storybook/react-native';
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs';

import CenterView from '../../../storybook/decorators/CenterView';
import Spinner from '.';

storiesOf('Spinner', module)
	.addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Spinner', () =>
		<Spinner
			animating={boolean("Animating", true)}
			color={text("Color", "#000000")}
			size={select("Size", {Small: 'small', Large: 'large'}, 'small')}
		/>
	);
