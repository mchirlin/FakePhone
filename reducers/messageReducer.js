import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  MESSAGE_ADD: 'MESSAGE_ADD',
  THREAD_ADD: 'THREAD_ADD',
  THREAD_OPEN: 'THREAD_OPEN',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  messageAdd: (thread, isMe, message) => {
    return {type: types.MESSAGE_ADD, payload: {
      thread: thread,
      isMe: isMe,
      message: message
    }}
  },
  threadAdd: (contact, messages) => {
    return {type: types.THREAD_ADD, payload: {
      contact: contact,
      messages: messages
    }}
  },
  threadOpen: (id) => {
    return {type: types.THREAD_OPEN, payload: id}
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
export const message = (state = initialState, action) => {
  const {threads, badgeNumber} = state
  const {type, payload} = action

  switch (type) {
    case types.MESSAGE_ADD: {
      const index = threads.findIndex((thread) => {
        console.log('Thread ID', thread.id, 'Payload Thread', payload.thread);
        return thread.id == payload.thread
      });
      const thread = threads[index];
      console.log('Index', index);
      console.log('Threads', threads, 'Thread', thread);

      return {
        ...state,
        badgeNumber: badgeNumber + 1,
        threads: updateObjectInArray(
          threads,
          {
            index: index,
            item: {
              ...thread,
              messages: [...thread.messages,
                {
                  id: 'MESSAGE' + (thread.messages.length + 1),
                  message: payload.message,
                  time: payload.time,
                  isMe: payload.isMe
                }
              ],
              read: false
            }
          }
        )
      }
    }
    case types.THREAD_ADD: {
      return {
        ...state,
        badgeNumber: badgeNumber + payload.messages.length,
        threads: [
          ...threads,
          {
            id: payload.id,
            contact: payload.contact,
            messages: payload.messages
          }
        ]
      }
    }
    case types.THREAD_OPEN: {
      const index = threads.findIndex((thread) => {
        return thread.id == payload
      });
      const thread = threads[index];

      const badgeNum = badgeNumber - thread.messages.filter(message => !message.read).length;
      return {
        ...state,
        badgeNumber: badgeNum<0?0:badgeNum,
        threads: updateObjectInArray(
          threads,
          {
            index: index,
            item: {
              ...thread,
              messages: thread.messages.map(message => {
                return {
                  ...message,
                  read: true
                }
              })
            }
          }
        )
      }
    }
  }
  return state
}

export function onMessageAdd(from, to, time, subject, body) {
  return actionCreators.messageAdd(from, to, time, subject, body)
}

export function onThreadOpen(id) {
  return actionCreators.threadOpen(id)
}
