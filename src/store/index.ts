import {configureStore, getDefaultMiddleware, Middleware} from '@reduxjs/toolkit'
import logger from 'redux-logger';
import flipper from 'redux-flipper';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import slices from './slices';

export type ReduxState = ReturnType<typeof slices>;

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, slices);

const store = configureStore({
	reducer: persistedReducer,
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

export const persistor = persistStore(store);

export type ReduxDispatch = typeof store.dispatch;

export default store;
