import {updateObjectInArray} from './functions'

export const types = {
  SCAN: 'SCAN'
}

export const actionCreators = {
  scan: (data) => {
    return {type: types.SCAN, payload: data}
  }
}

const initialState = {
  url: ''
}

export const loading = (state = initialState, action) => {
  const {type, payload} = action

  switch (type) {
    case types.SCAN: {
      return {
        ...state,
        url: payload
      }
    }
  }
  return state
}

export function onScan(data) {
  return actionCreators.scan(data)
}
