import React from 'react';
import {Image, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import {DrawerNavigationProp} from "@react-navigation/drawer";
import CompassHeading from 'react-native-compass-heading';

import {tapped} from '../../store/slices/user';
import {ReduxState} from "../../store";
import {LoggedInDrawerParamList} from "../../navigation/LoggedIn";

const mapStateToProps = (state: ReduxState) => ({
	taps: state.user.data.taps
});

const mapDispatchToProps = {
	tapped
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

type State = {
	degree: number
};

class Home extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			degree: 30
		};


	}

	async componentDidMount() {
		await this.initializeCompass();
	}

	componentWillUnmount() {
		CompassHeading.stop();
	}

	initializeCompass = async () => {
		await CompassHeading.start(3, degree => {
			this.setState({degree});
		});
	};

	render() {
		const {degree} = this.state;

		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Image
					style={[
						{
							width: '90%',
							alignSelf: 'center'
						},
						{transform: [{rotate: `${360 - degree}deg`}]},
					]}
					resizeMode="contain"
					source={require('../../assets/compass.png')}
				/>
			</View>
		)
	}
}

export default connector(Home);
