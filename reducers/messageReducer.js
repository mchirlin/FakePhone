import {updateObjectInArray, addObjectToArrayAfterIndex} from '../functions/arrayFunctions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  MESSAGE_ADD: 'MESSAGE_ADD',
  MESSAGE_VISIBLE: 'MESSAGE_VISIBLE',
  THREAD_ADD: 'THREAD_ADD',
  THREAD_OPEN: 'THREAD_OPEN',
  THREAD_VISIBLE: 'THREAD_VISIBLE',
  DECISION_REMOVE: 'DECISION_REMOVE'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  messageAdd: (thread, message) => {
    return {type: types.MESSAGE_ADD, payload: {
      thread: thread,
      message: message
    }}
  },
  messageVisible: (thread, message) => {
    return {type: types.MESSAGE_VISIBLE, payload: {
      thread: thread,
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
  },
  threadVisible: (id, visible) => {
    return {type: types.THREAD_VISIBLE, payload: {
      id: id,
      visible: visible
    }}
  },
  decisionRemove: (thread, message) => {
    return {type: types.DECISION_REMOVE, payload: {
      thread: thread,
      message: message
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
export const message = (state = initialState, action) => {
  const {threads, badgeNumber} = state
  const {type, payload} = action

  switch (type) {
    case types.MESSAGE_ADD: {
      const index = threads.findIndex((thread) => {
        return thread.id == payload.thread
      });
      const thread = threads[index];
      const message = payload.message;
      const visibleIndices = thread.messages.map((item, index) => item.visible?index:null).filter(item => item != null);
      const visibleIndex = Math.max.apply(Math, visibleIndices);

      return {
        ...state,
        badgeNumber: message.isMe ? badgeNumber : badgeNumber + 1,
        threads: updateObjectInArray(
          threads,
          {
            index: index,
            item: {
              ...thread,
              messages: addObjectToArrayAfterIndex(
                thread.messages,
                {
                  index: visibleIndex + 1,
                  item: {
                    id: 'MESSAGE' + (thread.messages.length + 1),
                    message: message.message,
                    time: message.time,
                    isMe: message.isMe,
                    read: message.read?message.read:false,
                    visible: message.visible?message.visible:true
                  }
                }
              )
            }
          }
        )
      }
    }
    case types.MESSAGE_VISIBLE: {
      const threadIndex = threads.findIndex((thread) => {
        return thread.id == payload.thread
      });
      const thread = threads[threadIndex];

      const messageIndex = thread.messages.findIndex((message) => {
        return message.id == payload.message
      });
      const message = thread.messages[messageIndex];

      return {
        ...state,
        badgeNumber: badgeNumber + 1,
        threads: updateObjectInArray(
          threads,
          {
            index: threadIndex,
            item: {
              ...thread,
              messages: updateObjectInArray(
                thread.messages,
                {
                  index: messageIndex,
                  item: {
                    ...message,
                    visible: true
                  }
                }
              )
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

      const readNumber = thread.messages.filter(message => {
        return !message.read && message.decisionId == null && message.visible;
      }).length;
      
      const badgeNum = badgeNumber - readNumber;

      return {
        ...state,
        badgeNumber: badgeNum < 0 ? 0 : badgeNum,
        threads: updateObjectInArray(
          threads,
          {
            index: index,
            item: {
              ...thread,
              messages: thread.messages.map(message => {
                return {
                  ...message,
                  read: (message.visible && message.decisionId == null)?true:false
                }
              })
            }
          }
        )
      }
    }
    case types.THREAD_VISIBLE: {
      const index = threads.findIndex((thread) => {
        return thread.id == payload.id
      });
      const thread = threads[index];

      return {
        ...state,
        badgeNumber: payload.visible?badgeNumber + thread.messages.filter(message => message.visible).length:badgeNumber,
        threads: updateObjectInArray(
          threads,
          {index: index, item: {
            ...thread,
            visible: payload.visible
          }}
        )
      }
    }
    case types.DECISION_REMOVE: {
      const threadIndex = threads.findIndex((thread) => {
        return thread.id == payload.thread
      });
      const thread = threads[threadIndex];

      const messageIndex = thread.messages.findIndex((message) => {
        return message.id == payload.message
      });
      const message = thread.messages[messageIndex];

      return {
        ...state,
        badgeNumber: (((badgeNumber - 1) < 0) || message.isMe) ? badgeNumber : (badgeNumber - 1),
        threads: updateObjectInArray(
          threads,
          {
            index: threadIndex,
            item: {
              ...thread,
              messages: updateObjectInArray(
                thread.messages,
                {
                  index: messageIndex,
                  item: {
                    ...message,
                    decisionId: null,
                    read: true
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

export function onMessageAdd(thread, message) {
  return actionCreators.messageAdd(thread, message);
}

export function onMessageVisible(thread, message) {
  return actionCreators.messageVisible(thread, message);
}

export function onThreadOpen(id) {
  return actionCreators.threadOpen(id);
}

export function onThreadVisible(id, visible) {
  return actionCreators.threadOpen(id, visible);
}

export function onDecisionRemove(thread, message) {
  return actionCreators.decisionRemove(thread, message);
}
