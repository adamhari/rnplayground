import {PayloadAction} from "@reduxjs/toolkit";

import {createGenericSlice, GenericState} from "../utilities";

type UserState = {
	username: string
};

type SliceState = GenericState<UserState>;

const initialState: SliceState = {
	data: {
		username: 'adamh'
	}
};

const slice = createGenericSlice({
	name: 'user',
	initialState,
	reducers: {
		usernameChanged: (state, {payload}: PayloadAction<string>) => {
			state.data.username = payload;
		}
	}
});

const {actions, reducer} = slice;
export const {usernameChanged} = actions;

export default reducer;
