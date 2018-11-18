// The types of actions that you can dispatch to modify the state of the store
export const types = {
  NUMBER_ADD: 'NUMBER_ADD',
  NUMBER_DELETE: 'NUMBER_DELETE',
  CALL_START: 'CALL_START',
  CALL_END: 'CALL_END',
  SOUND_END: 'SOUND_END',
  TIMER_UPDATE: 'TIMER_UPDATE'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  numberAdd: (number) => {
    return {type: types.NUMBER_ADD, payload: number}
  },
  numberDelete: () => {
    return {type: types.NUMBER_DELETE}
  },
  callStart: (phoneNumber) => {
    return {type: types.CALL_START, payload: phoneNumber}
  },
  callEnd: () => {
    return {type: types.CALL_END}
  },
  soundEnd: () => {
    return {type: types.SOUND_END}
  },
  timerUpdate: () => {
    return {type: types.TIMER_UPDATE}
  }
}

// Initial state of the store
const initialState = {
  phoneNumber: '',
  audioTrack: null,
  isPlaying: false,
  timerSeconds: 0,
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
  const {phoneNumber, timerSeconds} = state
  const {type, payload} = action

  switch (type) {
    case types.NUMBER_ADD: {
      return {
        ...state,
        phoneNumber: phoneNumber + payload,
        audioTrack: payload,
        isPlaying: true,
      }
    }
    case types.NUMBER_DELETE: {
      return {
        ...state,
        phoneNumber: phoneNumber.substr(0, phoneNumber.length - 1),
      }
    }
    case types.CALL_START: {
      return {
        ...state,
        audioTrack: phoneNumber,
        isPlaying: true,
      }
    }
    case types.CALL_END: {
      return {
        ...state,
        phoneNumber: '',
        isPlaying: false,
        timerSeconds: 0
      }
    }
    case types.SOUND_END: {
      return {
        ...state,
        isPlaying: false
      }
    }
    case types.TIMER_UPDATE: {
      return {
        ...state,
        timerSeconds: timerSeconds + 1
      }
    }
  }

  return state
}

export function onNumberAdd(number) {
  return actionCreators.numberAdd(number)
}

export function onNumberDelete() {
  return actionCreators.numberDelete()
}

export function onCallStart(phoneNumber) {
  return actionCreators.callStart()
}

export function onCallEnd() {
  return actionCreators.callEnd()
}

export function onSoundEnd() {
  return actionCreators.soundEnd()
}

export function onTimerUpdate() {
  return actionCreators.timerUpdate()
}
