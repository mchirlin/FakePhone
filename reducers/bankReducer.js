import { updateObjectInArray } from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  USERNAME_UPDATE: 'USERNAME_UPDATE',
  PASSWORD_UPDATE: 'PASSWORD_UPDATE',
  ANSWER_UPDATE: 'ANSWER_UPDATE'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  usernameUpdate: (username) => {
    return {type: types.USERNAME_UPDATE, payload: username}
  },
  passwordUpdate: (password) => {
    return {type: types.PASSWORD_UPDATE, payload: password}
  },
  answerUpdate: (answer, index) => {
    return {type: types.ANSWER_UPDATE, payload: {answer: answer, index: index}}
  }
}

// Initial state of the store
const initialState = {
  username: '',
  password: ''
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const bank  = (state = initialState, action) => {
  const {username, password, questions} = state
  const {type, payload} = action

  switch (type) {
    case types.USERNAME_UPDATE: {
      return {
        ...state,
        username: payload
      }
    }
    case types.PASSWORD_UPDATE: {
      return {
        ...state,
        password: payload
      }
    }
    case types.ANSWER_UPDATE: {
      return {
        ...state,
        questions: updateObjectInArray(
          questions,
          {
            index: payload.index,
            item: {
              ...questions[payload.index],
              attempt: payload.answer
            }
          }
        )
      }
    }
  }

  return state
}

export function onUsernameUpdate(username) {
  return actionCreators.usernameUpdate(username)
}

export function onPasswordUpdate(password) {
  return actionCreators.passwordUpdate(password)
}

export function onAnswerUpdate(answer, index) {
  return actionCreators.answerUpdate(answer, index)
}
