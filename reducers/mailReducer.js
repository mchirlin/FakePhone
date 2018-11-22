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
  selectedEmail: 0,
  emails: [{
    id: '0',
    from: 'Joe, Bob',
    to: 'me',
    time: 'Fri',
    subject: 'Here is the subject line',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    read: false
  },
  {
    id: '1',
    time: 'Thu',
    from: 'Michael',
    to: 'me',
    subject: 'This is another subject line',
    body: 'Is it me you\'re looking for?',
    read: true
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
  const {selectedEmail, emails} = state
  const {type, payload} = action

  switch (type) {
    case types.MAIL_ADD: {
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
    case types.MAIL_OPEN: {
      const index = parseInt(payload)
      return {
        ...state,
        selectedEmail: index,
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
