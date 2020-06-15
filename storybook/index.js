import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getStorybookUI, configure } from '@storybook/react-native';
import {name as appName} from '../app.json';
import { loadStories } from './storyLoader';	// generated during storybook runtime

import './rn-addons';

// import stories using react-native-storybook-loader
configure(() => {
	loadStories()
}, module);


// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
	asyncStorage: AsyncStorage
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
