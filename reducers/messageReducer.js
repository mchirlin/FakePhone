import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  MESSAGE_ADD: 'MESSAGE_ADD'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  messageAdd: (from, to, time, subject, body) => {
    return {type: types.MAIL_ADD, payload: {
      from: from,
      to: to,
      time: time,
      subject: subject,
      body: body
    }}
  }
}

// Initial state of the store
const initialState = {
  selectedMesage: 0,
  messages: []
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const message = (state = initialState, action) => {
  const {selectedMesage, messages} = state
  const {type, payload} = action

  switch (type) {
    case types.MESSAGE_ADD: {
      return {
        ...state,
        emails: [...emails, {
          id: emails.length.toString(),
          from: payload.from,
          to: payload.to,
          time: payload.time,
          subject: payload.subject,
          body: payload.body,
          read: false
        }]
      }
    }
  }
  return state
}

export function onMessageAdd(from, to, time, subject, body) {
  return actionCreators.messageAdd(from, to, time, subject, body)
}
