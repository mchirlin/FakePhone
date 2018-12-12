import {updateObjectInArray} from './functions'

export const types = {
  DATE_ADD: 'DATE_ADD',
}

export const actionCreators = {
  dateAdd: (data) => {
    return {type: types.DATE_ADD, payload: data}
  }
}

const initialState = {
}

export const calendar = (state = initialState, action) => {
  const {markedDates} = state;
  const {type, payload} = action;

  switch (type) {
    case types.DATE_ADD: {
      return {
        ...state,
        markedDates: [
          ...markedDates,
          payload
        ]
      }
    }
  }
  return state
}

export function onDateAdd(payload) {
  return actionCreators.dateAdd(payload)
}
