import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  TIMER_START: 'TIMER_START',
  TIMER_TICK: 'TIMER_TICK',
  TIMER_STOP: 'TIMER_STOP',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  timerStart: () => {
    return {type: types.TIMER_START}
  },
  timerTick: () => {
    return {type: types.TIMER_TICK}
  },
  timerStop: () => {
    return {type: types.TIMER_STOP}
  },
}

// Initial state of the store
const initialState = {
  timer: null
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const mail = (state = initialState, action) => {
  const {timer} = state
  const {type, payload} = action

  switch (type) {
    case types.TIMER_START: {
      return {
        ...state,
      }
    }
    case types.TIMER_TICK: {
      const index = parseInt(payload)
      return {
        ...state,
      }
    }
    case types.TIMER_STOP: {
      return {
        ...state
      }
    }
  }
  return state
}

export function onTimerStart() {
  return actionCreators.timerStart()
}

export function onTimerTick() {
  return actionCreators.timerTick()
}

export function onTimerStop() {
  return actionCreators.timerStop()
}
