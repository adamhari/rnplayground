import React from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import {DrawerNavigationProp} from "@react-navigation/drawer";

import {usernameChanged} from '../../store/slices/user';
import {ReduxState} from "../../store";
import {TouchableOpacity} from "react-native-gesture-handler";
import {LoggedInDrawerParamList} from "../../navigation/LoggedIn";

const mapStateToProps = (state: ReduxState) => ({
	username: state.user.data.username
});

const mapDispatchToProps = {
	usernameChanged
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type HomeScreenRouteProp = RouteProp<LoggedInDrawerParamList, 'Home'>;
type HomeScreenNavigationProp = DrawerNavigationProp<LoggedInDrawerParamList, 'Home'>;
type PropsFromNavigation = {
	route: HomeScreenRouteProp,
	navigation: HomeScreenNavigationProp
};

type Props = PropsFromRedux & PropsFromNavigation;

type State = {};

class Home extends React.Component<Props, State> {

	onPress = () => this.props.usernameChanged(this.props.username + this.props.username);

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<TouchableOpacity onPress={this.onPress}>
					<Text>test redux</Text>
				</TouchableOpacity>
				<Text>{this.props.username}</Text>
			</View>
		)
	}
}

export default connector(Home);
