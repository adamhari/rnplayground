import React from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {ReduxState} from "../../store";

const mapStateToProps = (state: ReduxState) => ({
});

const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type State = {};
type Props = PropsFromRedux & {};

class AnotherScreen extends React.Component<Props, State> {

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>Another Screen</Text>
			</View>
		)
	}
}

export default connector(AnotherScreen);
