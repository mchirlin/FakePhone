import { updateObjectInArray } from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  EVENT_COMPLETE: 'EVENT_COMPLETE',
  EVENT_ACTIVATE: 'EVENT_ACTIVATE',
  EVENT_TIMER_START: 'EVENT_TIMER_START',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  complete: (event) => {
    return {type: types.EVENT_COMPLETE, payload: event}
  },
  activate: (id) => {
    return {type: types.EVENT_ACTIVATE, payload: id}
  },
  timerStart: () => {
    return {type: types.EVENT_TIMER_START}
  }
}

// Initial state of the store
const initialState = {

}

export const event = (state = initialState, action) => {
  const {events} = state
  const {type, payload} = action

  switch (type) {
    case types.EVENT_COMPLETE: {
      const indices = events.map((item, i) => item.id === payload.id ? i : '').filter(String)
      let updatedEvents = events;

      indices.forEach((ind) => {

        let event = updatedEvents[ind];

        updatedEvents = updateObjectInArray(
          updatedEvents,
          {
            index: ind,
            item: {
              ...event,
              status: 'completed'
            }
          }
        );
      });

      return {
        ...state,
        events: updatedEvents
      }
    }
    case types.EVENT_ACTIVATE: {
      const indices = events.map((item, i) => item.id === payload ? i : '').filter(String)
      let updatedEvents = events;

      indices.forEach((ind) => {

        let event = updatedEvents[ind];

        if(event.status != 'completed') {
          updatedEvents = updateObjectInArray(
            updatedEvents,
            {
              index: ind,
              item: {
                ...event,
                status: event.status === 'inactive'?'pending':'active',
                startedOn: event.status === 'inactive'?null:(new Date()).getTime()
              }
            }
          );
        }
      });

      return {
        ...state,
        events: updatedEvents
      }
    }
    case types.EVENT_TIMER_START: {
      return {
        ...state,
        timer: {
          started: true,
          startedOn: (new Date()).getTime() - 1000
        }
      }
    }
  }

  return state
}

export function onEventComplete(event) {
  return actionCreators.complete(event)
}

export function onEventActivate(id) {
  return actionCreators.activate(id)
}

export function onEventTimerStart() {
  return actionCreators.timerStart()
}
