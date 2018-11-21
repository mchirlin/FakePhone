import { combineReducers } from 'redux'

import { mail } from './mailReducer'
import { phone } from './phoneReducer'

export default combineReducers({phone, mail})
