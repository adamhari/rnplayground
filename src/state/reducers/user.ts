import {PayloadAction} from "@reduxjs/toolkit";

import {createGenericSlice, GenericState} from "../utilities";

type UserState = {
	username: string
};

type SliceState = GenericState<UserState>;

const initialState: SliceState = {
	data: {
		username: 'adamhari'
	}
};

const slice = createGenericSlice({
	name: 'user',
	initialState,
	reducers: {
		usernameChanged: (state, action: PayloadAction<string>) => {
			state.data.username = action.payload;
		}
	}
});

const {actions, reducer} = slice;
export const {usernameChanged} = actions;

export default reducer;
