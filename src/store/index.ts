import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import logger from 'redux-logger';

import reducer from './reducers';

export type ReduxState = ReturnType<typeof reducer>;

const store = configureStore({
	reducer,
	middleware: [...getDefaultMiddleware<ReduxState>(), logger],
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState: {},
	enhancers: []
});

export type ReduxDispatch = typeof store.dispatch;

export default store;
