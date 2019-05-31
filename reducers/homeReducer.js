import {updateObjectInArray} from '../functions/arrayFunctions'

export const types = {
  TIMER_START: 'TIMER_START',
  TIMER_STOP: 'TIMER_STOP',
  PENALTY_ADD: 'PENALTY_ADD',
  SCREEN_SWITCH: 'SCREEN_SWITCH'
}

export const actionCreators = {
  timerStart: (data) => {
    return {type: types.TIMER_START, payload: data}
  },
  timerStop: (data) => {
    return {type: types.TIMER_STOP, payload: data}
  },
  penaltyAdd: (data) => {
    return {type: types.PENALTY_ADD, payload: data}
  },
  screenSwitch: (data) => {
    return {type: types.SCREEN_SWITCH, payload: data}
  }
}

const initialState = {
}

export const home = (state = initialState, action) => {
  const {penalties} = state;
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
    case types.PENALTY_ADD: {
      let penaltyArr;
      if (penalties) {
        penaltyArr = [
          ...penalties,
          payload
        ]
      } else {
        penaltyArr = [payload]
      }

      return {
        ...state,
        penalties: penaltyArr
      }
    }
    case types.SCREEN_SWITCH: {
      return {
        ...state,
        screen: payload
      }
    }
  }
  return state;
}

export function onTimerStart(data) {
  return actionCreators.timerStart(data);
}

export function onTimerStop(data) {
  return actionCreators.timerStop(data);
}

export function onPenaltyAdd(data) {
  return actionCreators.penaltyAdd(data);
}

export function onScreenSwitch(data) {
  return actionCreators.screenSwitch(data);
}
