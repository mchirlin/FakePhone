import { updateObjectInArray } from '../functions/arrayFunctions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  EVENT_COMPLETE: 'EVENT_COMPLETE',
  EVENT_ACTIVATE: 'EVENT_ACTIVATE',
  EVENT_TIMER_START: 'EVENT_TIMER_START',
  EVENT_ADD: 'EVENT_ADD'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  eventComplete: (event) => {
    return {type: types.EVENT_COMPLETE, payload: event}
  },
  eventActivate: (id) => {
    return {type: types.EVENT_ACTIVATE, payload: id}
  },
  eventTimerStart: () => {
    return {type: types.EVENT_TIMER_START}
  },
  eventAdd: (event) => {
    return {type: types.EVENT_ADD, payload: event}
  }
}

// Initial state of the store
const initialState = {

}

export const event = (state = initialState, action) => {
  const {events} = state;
  const {type, payload} = action;

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
    case types.EVENT_ADD: {
      return {
        ...state,
        events: [
          ...events,
          payload
        ]
      }
    }
  }

  return state
}

export function onEventComplete(event) {
  return actionCreators.eventComplete(event);
}

export function onEventActivate(id) {
  if (id.startsWith("HINT")) {
    let hintId = id.replace(/.*([0-9]+)/, '$1');
    return actionCreators.eventAdd(
      {
        id: id,
        status: "active",
        delay: 0,
        action: {
          type: "HINT",
          payload: hintId
        },
        startedOn: (new Date()).getTime() - 1000
      }
    );
  } else return actionCreators.eventActivate(id);
}

export function onEventTimerStart() {
  return actionCreators.eventTimerStart();
}

export function onEventAdd(event) {
  return actionCreators.eventAdd(event);
}
