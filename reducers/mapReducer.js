import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  MARKER_ADD: 'MARKER_ADD',
  MARKER_FOUND: 'MARKER_FOUND',
  LOCATION_UPDATE: 'LOCATION_UPDATE',
  LOCATION_VIEW_ALL: 'LOCATION_VIEW_ALL'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  markerAdd: (payload) => {
    return {type: types.MARKER_ADD, payload: payload}
  },
  markerFound: (id) => {
    return {type: types.MARKER_FOUND, payload: id}
  },
  locationUpdate: (payload) => {
    return {type: types.LOCATION_UPDATE, payload: payload}
  },
  locationViewAll: () => {
    return {type: types.LOCATION_VIEW_ALL}
  }
}

// Initial state of the store
const initialState = {
  markers: []
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const map = (state = initialState, action) => {
  const {markers, badgeNumber} = state
  const {type, payload} = action

  switch (type) {
    case types.MARKER_ADD: {
      return {
        ...state,
        badgeNumber: badgeNumber + 1,
        markers: [...markers, payload]
      }
    }
    case types.MARKER_FOUND: {
      const index = markers.findIndex((marker) => {
        return marker.id === payload
      })

      if (markers[index].found) return state

      return {
        ...state,
        markers: updateObjectInArray(
          markers,
          {index: index, item: {
            ...markers[index],
            found: true
          }}
        )
      }
    }
    case types.LOCATION_UPDATE: {
      return {
        ...state,
        currentLocation: {
          latitude: payload.coords.latitude,
          longitude: payload.coords.longitude
        }
      }
    }
    case types.LOCATION_VIEW_ALL: {
      return {
        ...state,
        badgeNumber: 0
      }
    }
  }
  return state
}

export function onMarkerAdd(payload) {
  return actionCreators.markerAdd(payload)
}

export function onMarkerFound(id) {
  return actionCreators.markerFound(id)
}

export function onLocationUpdate(payload) {
  return actionCreators.locationUpdate(payload)
}

export function onLocationViewAll() {
  return actionCreators.locationViewAll()
}
