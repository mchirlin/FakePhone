import {updateObjectInArray, removeObjectInArray} from '../functions/arrayFunctions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  OPTION_ADD: 'OPTION_ADD',
  OPTION_REMOVE: 'OPTION_REMOVE',
  OPTION_CHOOSE: 'OPTION_CHOOSE'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  optionAdd: (decisionId, option) => {
    return {type: types.OPTION_ADD, payload: {
      decisionId: decisionId,
      option: option
    }}
  },
  optionRemove: (decisionId, optionId) => {
    return {type: types.OPTION_REMOVE, payload: {
      decisionId: decisionId,
      optionId: optionId
    }}
  },
  optionChoose: (decisionId, optionId) => {
    return {type: types.OPTION_CHOOSE, payload: {
      decisionId: decisionId,
      optionId: optionId
    }}
  }
}

// Initial state of the store
const initialState = {
  messages: []
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const decision = (state = initialState, action) => {
  const {decisions} = state;
  const {type, payload} = action;

  switch (type) {
    case types.OPTION_ADD: {
      const decisionIndex = decisions.findIndex((decision) => {
        return decision.id == payload.decisionId
      });
      const decision = decisions[decisionIndex];

      return {
        ...state,
        decisions: updateObjectInArray(
          decisions,
          {
            index: decisionIndex,
            item: {
              ...decision,
              options: [
                ...decision.options,
                payload.option
              ]
            }
          }
        )
      }
    }
    case types.OPTION_REMOVE: {
      const decisionIndex = decisions.findIndex((decision) => {
        return decision.id == payload.decisionId
      });
      const decision = decisions[decisionIndex];

      const optionIndex = decision.options.findIndex((option) => {
        return option.id == payload.optionId
      });

      return {
        ...state,
        decisions: updateObjectInArray(
          decisions,
          {
            index: decisionIndex,
            item: {
              ...decision,
              options: removeObjectInArray(
                decision.options,
                optionIndex
              )
            }
          }
        )
      }
    }
    case types.OPTION_CHOOSE: {
      const decisionIndex = decisions.findIndex((decision) => {
        return decision.id == payload.decisionId
      });
      const decision = decisions[decisionIndex];

      const optionIndex = decision.options.findIndex((option) => {
        return option.id == payload.optionId
      });
      const option = decision.options[optionIndex];

      return {
        ...state,
        decisions: updateObjectInArray(
          decisions,
          {
            index: decisionIndex,
            item: {
              ...decision,
              options: updateObjectInArray(
                decision.options,
                {
                  index: optionIndex,
                  item: {
                    ...option,
                    status: "selected"
                  }
                }
              )
            }
          }
        )
      }
    }
  }
  return state
}

export function onOptionAdd(decisionId, option) {
  return actionCreators.optionAdd(decisionId, option)
}

export function onOptionRemove(decisionId, optionId) {
  return actionCreators.optionRemove(decisionId, optionId)
}

export function onOptionChoose(decisionId, optionId) {
  return actionCreators.optionChoose(decisionId, optionId)
}
