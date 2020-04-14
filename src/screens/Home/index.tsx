import React from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {usernameChanged} from '../../store/slices/user';
import {ReduxState} from "../../store";
import {TouchableOpacity} from "react-native-gesture-handler";

const mapStateToProps = (state: ReduxState) => ({
	username: state.user.data.username
});

const mapDispatchToProps = {
	usernameChanged
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type State = {};
type Props = PropsFromRedux & {};

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
