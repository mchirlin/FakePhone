import {updateObjectInArray} from '../functions/arrayFunctions'

export const types = {
  TIMER_START: 'TIMER_START',
  TIMER_STOP: 'TIMER_STOP',
  DELAY_ADD: 'DELAY_ADD',
  SCREEN_SWITCH: 'SCREEN_SWITCH'
}

export const actionCreators = {
  timerStart: (data) => {
    return {type: types.TIMER_START, payload: data}
  },
  timerStop: (data) => {
    return {type: types.TIMER_STOP, payload: data}
  },
  delayAdd: (data) => {
    return {type: types.DELAY_ADD, payload: data}
  },
  screenSwitch: (data) => {
    return {type: types.SCREEN_SWITCH, payload: data}
  }
}

const initialState = {
}

export const home = (state = initialState, action) => {
  const {delays} = state;
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
    case types.DELAY_ADD: {
      let delayArr;
      if (delays) {
        delayArr = [
          ...delays,
          payload
        ]
      } else {
        delayArr = [payload]
      }

      return {
        ...state,
        delays: delayArr
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

export function onDelayAdd(data) {
  return actionCreators.delayAdd(data);
}

export function onScreenSwitch(data) {
  return actionCreators.screenSwitch(data);
}
