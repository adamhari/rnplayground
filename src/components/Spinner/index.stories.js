import React from 'react';

import { storiesOf } from '@storybook/react-native';

import CenterView from '../../../storybook/decorators/CenterView';
import Spinner from '.';

storiesOf('Spinner', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('small', () => <Spinner size={'small'} />)
  .add('large', () =>  <Spinner size={'large'} />);
