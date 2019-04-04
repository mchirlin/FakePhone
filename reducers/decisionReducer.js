import {updateObjectInArray} from '../functions/arrayFunctions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD_OPTION: 'ADD_OPTION',
  CHOOSE_OPTION: 'CHOOSE_OPTION'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  addOption: (decisionId, optionId, optionText) => {
    return {type: types.ADD_OPTION, payload: {
      decisionId: decisionId,
      option: {
        id: optionId,
        text: optionText
      }
    }}
  },
  chooseOption: (decisionId, optionId) => {
    return {type: types.CHOOSE_OPTION, payload: {
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
    case types.ADD_OPTION: {

      return {
        ...state
      }
    }
    case types.CHOOSE_OPTION: {
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

export function onAddOption(decisionId, optionId, optionText) {
  return actionCreators.addOption(decisionId, optionId, optionText)
}

export function onChooseOption(decisionId, optionId) {
  return actionCreators.chooseOption(decisionId, optionId)
}
