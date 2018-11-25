import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// import initialState from './initialState.json'
import { lock } from './lockReducer'
import { mail } from './mailReducer'
import { phone } from './phoneReducer'
import { message } from './messageReducer'
import { map } from './mapReducer'
import { bank } from './bankReducer'
import { photos } from './photosReducer'
import { event } from './eventReducer'

const rootReducer = combineReducers({
  lock,
  phone,
  mail,
  message,
  map,
  bank,
  photos,
  event
})

const persistConfig = {
  key: 'root',
  storage,
  autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

async function loadResource(url) {
  try {
    let response = await fetch(url)
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export default async (url) => {
  const initialState = await loadResource(url)

  console.log("Presisted reducer", persistedReducer)

  let store = createStore(persistedReducer, initialState)
  let persistor = persistStore(store)
  return { store, persistor }
}
