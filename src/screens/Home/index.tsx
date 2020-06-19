import React from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import {DrawerNavigationProp} from "@react-navigation/drawer";

import {tapped} from '../../store/slices/user';
import {ReduxState} from "../../store";
import {LoggedInDrawerStackParamList} from "../../navigation/LoggedIn";
import Target from "../../components/Target";
import Truck from "../../components/Truck";

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

	renderTargets = (x) => Array.apply(null, { length: x }).map(() => (
		<Target onPress={this.onPress} />
	));

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white'}}>
				{this.renderTargets(1)}
				<Text>Score: {this.props.taps.toString()}</Text>
				<Truck onPress={this.onPress} />
			</View>
		)
	}
}

export default connector(Home);
