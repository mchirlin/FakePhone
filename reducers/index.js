import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// TODO Comment to turn on QR codes
// import initialState from './initialState.json'
import { start } from './startReducer'
import { settings } from './settingsReducer'
import { lock } from './lockReducer'
import { home } from './homeReducer'
import { mail } from './mailReducer'
import { phone } from './phoneReducer'
import { message } from './messageReducer'
import { map } from './mapReducer'
import { bank } from './bankReducer'
import { calendar } from './calendarReducer'
import { photos } from './photosReducer'
import { stats } from './statsReducer'
import { decision } from './decisionReducer'
import { hint } from './hintReducer'
import { event } from './eventReducer'

const rootReducer = combineReducers({
  start,
  settings,
  lock,
  home,
  phone,
  mail,
  message,
  map,
  bank,
  calendar,
  photos,
  stats,
  decision,
  hint,
  event
})

export const persistConfig = {
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

export default async () => {
  const initialState = await loadResource('https://www.dropbox.com/s/urgp8auouptgdbp/initialState.json?dl=1')

  let store = createStore(persistedReducer, initialState);
  let persistor = persistStore(store);

  return { store, persistor }
}
