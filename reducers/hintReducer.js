// The types of actions that you can dispatch to modify the state of the store
export const types = {
  HINT_ADD: 'HINT_ADD'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  hintAdd: () => {
    return {type: types.HINT_ADD}
  },
  hintActivate: (hint) => {
    return {type: types.HINT_ACTIVATE, payload: hint}
  }
}

// Initial state of the store
const initialState = {
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const hint  = (state = initialState, action) => {
  const {hints} = state;
  const {type, payload} = action;

  switch (type) {
    case types.HINT_ADD: {
      return {
        ...state
      }
    }
    case types.HINT_ACTIVATE: {
      const indices = hints.map((item, i) => item.id === payload ? i : '').filter(String)
      let updatedHints = hints;

      indices.forEach((ind) => {

        let hint = updatedHints[ind];

        if(hint.status != 'completed') {
          updatedHints = updateObjectInArray(
            updatedHints,
            {
              index: ind,
              item: {
                ...hint,
                status: hint.status === 'inactive'?'pending':'active'
              }
            }
          );
        }
      });

      return {
        ...state,
        hints: updatedHints
      }
    }
  }

  return state
}

export function onHintAdd(thread, hint) {
  return actionCreators.hintAdd(thread, hint);
}

export function onHintActivate(thread, hint) {
  return actionCreators.hintActivate(thread, hint);
}
