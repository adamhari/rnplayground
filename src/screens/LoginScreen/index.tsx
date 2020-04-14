import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {ReduxState} from "../../store";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {RootStackParamList} from "../../navigation";
const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type State = {};
type Props = PropsFromRedux & {navigation: StackNavigationProp<RootStackParamList, 'Login'>};

class LoginScreen extends React.Component<Props, State> {

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('SignedIn')}>
					<Text>Login</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

export default connector(LoginScreen);
