import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import initialState from './initialState.json'
import { lock } from './lockReducer'
import { mail } from './mailReducer'
import { phone } from './phoneReducer'
import { message } from './messageReducer'
import { map } from './mapReducer'
import { event } from './eventReducer'

const rootReducer = combineReducers({lock, phone, mail, message, map, event})

const persistConfig = {
  key: 'root',
  storage,
  autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, initialState)
  let persistor = persistStore(store)
  return { store, persistor }
}
