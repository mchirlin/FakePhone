import {updateObjectInArray} from './functions'

export const types = {
  TIMER_START: 'TIMER_START',
  TIMER_STOP: 'TIMER_STOP'
}

export const actionCreators = {
  timerStart: (data) => {
    return {type: types.TIMER_START, payload: data}
  },
  timerStop: (data) => {
    return {type: types.TIMER_STOP, payload: data}
  }
}

const initialState = {
}

export const home = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case types.TIMER_START: {
      return {
        ...state,
        timeStart: (new Date()).getTime()
      }
    }
    case types.TIMER_STOP: {
      return {
        ...state,
        timeEnd: (new Date()).getTime()
      }
    }
  }
  return state
}

export function onTimerStart(data) {
  return actionCreators.timerStart(data)
}

export function onTimerStop(data) {
  return actionCreators.timerStop(data)
}
