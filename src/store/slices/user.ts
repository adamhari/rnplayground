import {PayloadAction} from "@reduxjs/toolkit";

import {createGenericSlice, GenericState} from "../utilities";

type UserState = {
	taps: number
};

type SliceState = GenericState<UserState>;

const initialState: SliceState = {
	data: {
		taps: 0
	}
};

const slice = createGenericSlice({
	name: 'user',
	initialState,
	reducers: {
		tapped: (state, {payload}: PayloadAction<void>) => {
			state.data.taps++;
		}
	}
});

const {actions, reducer} = slice;
export const {tapped} = actions;

export default reducer;
