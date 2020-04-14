import React from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {ReduxState} from "../../store";

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type State = {};
type Props = PropsFromRedux & {};

class LoginScreen extends React.Component<Props, State> {

	render() {
		return (
			<View>
				<Text>Login</Text>
			</View>
		)
	}
}

export default connector(LoginScreen);
