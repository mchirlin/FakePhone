import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { loading } from './loadingReducer'

const persistConfig = {
  key: 'loading',
  storage,
  autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, loading)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
