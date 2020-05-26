import {configureStore, getDefaultMiddleware, Middleware} from '@reduxjs/toolkit'
import logger from 'redux-logger';
import flipper from 'redux-flipper';
import thunk, {ThunkMiddleware} from 'redux-thunk';

import slices from './slices';

export type ReduxState = ReturnType<typeof slices>;

const store = configureStore({
	reducer: slices,
	middleware: [
		// ...getDefaultMiddleware<ReduxState>(),
		flipper(),
		thunk as ThunkMiddleware,
		logger as Middleware
	],
	devTools: __DEV__,
	preloadedState: {},
	enhancers: []
});

export type ReduxDispatch = typeof store.dispatch;

export default store;
