import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  EMAIL_ADD: 'EMAIL_ADD',
  EMAIL_READ: 'EMAIL_READ',
  EMAIL_REPLY: 'EMAIL_REPLY',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  emailAdd: (from, to, time, subject, body) => {
    return {type: types.EMAIL_ADD, payload: {
      from: from,
      to: to,
      time: time,
      subject: subject,
      body: body
    }}
  },
  emailRead: (index) => {
    return {type: types.EMAIL_READ, payload: index}
  },
  emailReply: (body) => {
    return {type: types.EMAIL_REPLY, payload: body}
  },
}

// Initial state of the store
const initialState = {
  emails: [{
    id: '1',
    from: 'Ronny',
    time: 'Fri',
    subject: 'First',
    body: 'Hello'
  },
  {
    id: '2',
    time: 'Thu',
    from: 'Michael',
    subject: 'Second',
    body: 'Is it me you\'re looking for?'
  }]
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const mail = (state = initialState, action) => {
  const {emails} = state
  const {type, payload} = action

  switch (type) {
    case types.EMAIL_ADD: {
      return {
        ...state,
        emails: [...emails, {
          id: emails.length + 1,
          from: payload.from,
          to: payload.to,
          time: payload.time,
          subject: payload.subject,
          body: payload.body,
          read: false
        }]
      }
    }
    case types.EMAIL_READ: {
      return {
        ...state,
        emails: updateObjectInArray(emails, {index: payload, item: {read: true}})
      }
    }
    case types.EMAIL_REPLY: {
      return {
        ...state
      }
    }
  }

  return state
}

export function onEmailAdd(from, to, time, subject, body) {
  return actionCreators.emailAdd(from, to, time, subject, body)
}

export function onEmailRead(index) {
  return actionCreators.emailRead(index)
}

export function onEmailReploy(body) {
  return actionCreators.callStart()
}
