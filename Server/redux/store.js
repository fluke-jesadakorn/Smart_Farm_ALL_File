import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const preloadedState = {
  payload: 1
}

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const initialStore = (state = preloadedState) => {
  return createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}