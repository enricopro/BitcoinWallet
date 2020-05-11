import React from 'react';
import MainApplication from './mainapplication';
import Welcome from './src/components/welcome';
import { createStore, applyMiddleware } from 'redux';
import allReducer from './reducers';
import { Provider, useSelector, useDispatch } from 'react-redux';
import Divider from './divider'
import {persistStore, persistReducer} from 'redux-persist'
import { createLogger } from 'redux-logger';
import { PersistGate } from 'redux-persist/es/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['address', 'publicKey', 'privateKey', 'wif']
}

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = createStore(persistedReducer, applyMiddleware(createLogger()));

const peristedStore = persistStore(store);

export default function App() {

  return (
            <Provider store={store}>
                <PersistGate persistor={peristedStore} loading={null}>
                    <Divider />
                </PersistGate>
            </Provider>
  );
}
