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
  eventActivate: (trigger) => {
    return {type: types.EVENT_ACTIVATE, payload: trigger}
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
      let indices = events.map((item, i) => item.id === payload.id ? i : '').filter(String)
      let updatedEvents = events;

      // If the events doesn't exist, create it
      if (indices.length == 0) {
        let payloadString = calculatePayloadString(payload);
        updatedEvents.push(
          {
            id: payload.id,
            status: payload.status?payload.status:'pending',
            delay: payload.delay?payload.delay:0,
            action: {
              type: payload.type,
              payload: payloadString,
            }
          }
        );

        indices = [updatedEvents.length - 1];
      }

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

export function onEventActivate(trigger) {
  if (trigger.id != null && trigger.id.startsWith("HINT")) {
    let hintId = trigger.id.replace(/.*([0-9]+)/, '$1');
    return actionCreators.eventAdd(
      {
        id: trigger.id,
        status: "active",
        delay: 0,
        action: {
          type: "HINT",
          payload: hintId
        },
        startedOn: (new Date()).getTime() - 1000
      }
    );
  } else return actionCreators.eventActivate(trigger);
}

export function onEventTimerStart() {
  return actionCreators.eventTimerStart();
}

export function onEventAdd(event) {
  return actionCreators.eventAdd(event);
}

function calculatePayloadString(payload) {
  let payloadStr =  "{";

  switch(payload.type) {
    case "MESSAGE_VISIBLE":
      payloadStr += "\"message\": \"" + payload.message + "\", \"thread\": \"" + payload.thread + "\"";
      break;
    case "REGION_VISIBLE":
      payloadStr += "\"id\": \"" + payload.region + "\"";
      break;
    case "PENALTY_ADD":
      payloadStr += "\"penalty\":  " + payload.penalty + ", \"name\": \"" + payload.name + "\"";
      break;
    default:
      payloadStr +=  "\"id\": \"" + payload.id + "\""
      break;
  }

  if (payload.visible !=  null) {
    payloadStr += ", \"visible\": " + payload.visible + "}";
  } else {
    payloadStr += "}";
  }

  return payloadStr;
}
