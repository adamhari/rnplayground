import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from './storyLoader';	// generated during storybook runtime

import './rn-addons';

// import stories using react-native-storybook-loader
configure(() => {
	loadStories()
}, module);


// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('rnplayground', () => StorybookUIRoot);

export default StorybookUIRoot;
