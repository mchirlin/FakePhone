import { getKeyByKeyValue, updateObjectInArray } from './functions'
import colors from '../constants/colors'

export const types = {
  DATE_ADD: 'DATE_ADD',
  DATE_SELECT: 'DATE_SELECT',
  DATE_VISIBLE: 'DATE_VISIBLE'
}

export const actionCreators = {
  dateAdd: (data) => {
    return {type: types.DATE_ADD, payload: data}
  },
  dateSelect: (day) => {
    return {type: types.DATE_SELECT, payload: day}
  },
  dateVisible: (day, visible) => {
    return {type: types.DATE_SELECT, payload: {
      day: day,
      visible: visible
    }}
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
        markedDates: {
          ...markedDates,
          [payload.date]: payload.markedDate
        }
      }
    }
    case types.DATE_SELECT: {
      const selectedDate = getKeyByKeyValue(markedDates, 'selected', true)

      let newState = null;

      if(payload) {
        newState = {
          ...state,
          dateSelected: payload,
          markedDates: {
            ...markedDates,
            [selectedDate]: {
              ...markedDates[selectedDate],
              selected: false
            },
            [payload.dateString]: {
              ...markedDates[payload.dateString],
              selected: true,
              selectedColor: colors.blue
            }
          }
        }
      } else {
        newState = {
          ...state,
          dateSelected: null
        }
      }

      if(newState.markedDates[selectedDate] && !newState.markedDates[selectedDate].hasOwnProperty('description')) {
        delete newState.markedDates[selectedDate];
      }

      return newState;
    }
    case types.DATE_VISIBLE: {
      // TODO Write DATE_VISIBLE action
      return state;
    }
  }
  return state
}

export function onDateAdd(payload) {
  return actionCreators.dateAdd(payload)
}

export function onDateSelect(day) {
  return actionCreators.dateSelect(day)
}

export function onDateVisible(day, visible) {
  return actionCreators.dateVisible(day, visible)
}
