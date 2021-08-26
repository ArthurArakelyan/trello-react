import {createStore, combineReducers} from 'redux';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
}

const rootReducers = combineReducers(reducers);

const persistReducers = persistReducer(persistConfig, rootReducers);
const store = createStore(persistReducers);
const persistor = persistStore(store);

const rootStore = {store, persistor}

export default rootStore;