// The types of actions that you can dispatch to modify the state of the store
export const types = {
  UNLOCK: 'UNLOCK'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  unlock: () => {
    return {type: types.UNLOCK}
  }
}

// Initial state of the store
const initialState = {
  lockCode: "1234",
  unlocked: false
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const settings  = (state = initialState, action) => {
  const {unlocked} = state
  const {type, payload} = action

  switch (type) {
    case types.UNLOCK: {
      return {
        ...state,
        unlocked: true,
        timeStart: (new Date()).getTime()
      }
    }
  }

  return state
}

export function onUnlock(number) {
  return actionCreators.unlock(number)
}
