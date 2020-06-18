import React from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import {DrawerNavigationProp} from "@react-navigation/drawer";

import {tapped} from '../../store/slices/user';
import {ReduxState} from "../../store";
import {LoggedInDrawerStackParamList} from "../../navigation/LoggedIn";
import Target from "../../components/Target";

const mapStateToProps = (state: ReduxState) => ({
	taps: state.user.data.taps
});

const mapDispatchToProps = {
	tapped
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type HomeScreenRouteProp = RouteProp<LoggedInDrawerStackParamList, 'Home'>;
type HomeScreenNavigationProp = DrawerNavigationProp<LoggedInDrawerStackParamList, 'Home'>;
type PropsFromNavigation = {
	route: HomeScreenRouteProp,
	navigation: HomeScreenNavigationProp
};

type Props = PropsFromRedux & PropsFromNavigation;

type State = {};

class Home extends React.Component<Props, State> {

	onPress = () => this.props.tapped();

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
				<Target onPress={this.onPress} />
				<Text>Score: {this.props.taps.toString()}</Text>
			</View>
		)
	}
}

export default connector(Home);
