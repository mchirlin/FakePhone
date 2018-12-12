import {PushNotificationIOS} from 'react-native'
import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  MAIL_ADD: 'MAIL_ADD',
  MAIL_OPEN: 'MAIL_OPEN',
  MAIL_REPLY: 'MAIL_REPLY',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  mailAdd: (from, to, time, subject, body) => {
    return {type: types.MAIL_ADD, payload: {
      from: from,
      to: to,
      time: time,
      subject: subject,
      body: body
    }}
  },
  mailOpen: (index) => {
    return {type: types.MAIL_OPEN, payload: index}
  },
  mailReply: (body) => {
    return {type: types.MAIL_REPLY, payload: body}
  },
}

// Initial state of the store
const initialState = {
  emails: []
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const mail = (state = initialState, action) => {
  const {emails, badgeNumber} = state
  const {type, payload} = action

  switch (type) {
    case types.MAIL_ADD: {
      return {
        ...state,
        badgeNumber: badgeNumber + 1,
        emails: [...emails, {
          id: emails.length.toString(),
          from: payload.from,
          to: payload.to,
          time: payload.time,
          subject: payload.subject,
          body: payload.body,
          image: payload.image,
          video: payload.video,
          read: false
        }]
      }
    }
    case types.MAIL_OPEN: {
      const index = parseInt(payload)
      return {
        ...state,
        badgeNumber: emails[index].read?badgeNumber:badgeNumber - 1,
        emails: updateObjectInArray(emails, {index: index, item: {read: true}})
      }
    }
    case types.MAIL_REPLY: {
      return {
        ...state
      }
    }
  }
  return state
}

export function onMailAdd(from, to, time, subject, body) {
  return actionCreators.mailAdd(from, to, time, subject, body)
}

export function onMailOpen(index) {
  return actionCreators.mailOpen(index)
}

export function onMailReploy(body) {
  return actionCreators.mailReply()
}
