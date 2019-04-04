import { updateObjectInArray } from '../functions/arrayFunctions'
import { getDistance} from 'geolib'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  MARKER_ADD: 'MARKER_ADD',
  MARKER_FOUND: 'MARKER_FOUND',
  MARKER_VISIBLE: 'MARKER_VISIBLE',
  REGION_ADD: 'REGION_ADD',
  REGION_FOUND: 'REGION_FOUND',
  REGION_VISIBLE: 'REGION_VISIBLE',
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
  markerVisible: (id, visible) => {
    return {type: types.MARKER_VISIBLE, payload: {
      id: id,
      visible: visible
    }}
  },
  regionAdd: (payload) => {
    return {type: types.REGION_ADD, payload: payload}
  },
  regionFound: (id) => {
    return {type: types.REGION_FOUND, payload: id}
  },
  regionVisible: (id, visible) => {
    return {type: types.REGION_VISIBLE, payload: {
      id: id,
      visible: visible
    }}
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
  const {markers, regions, path, badgeNumber, currentLocation, distanceWalked} = state;
  const {type, payload} = action;

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
    case types.MARKER_VISIBLE: {
      const index = markers.findIndex((marker) => {
        return marker.id === payload.id
      })

      return {
        ...state,
        badgeNumber: payload.visible?badgeNumber + 1:badgeNumber,
        markers: updateObjectInArray(
          markers,
          {index: index, item: {
            ...markers[index],
            visible: payload.visible
          }}
        )
      }
    }
    case types.REGION_ADD: {
      return {
        ...state,
        badgeNumber: badgeNumber + 1,
        regions: [...regions, payload]
      }
    }
    case types.REGION_FOUND: {
      const index = regions.findIndex((region) => {
        return region.id === payload
      })

      if (regions[index].found) return state

      return {
        ...state,
        regions: updateObjectInArray(
          regions,
          {index: index, item: {
            ...regions[index],
            found: true
          }}
        )
      }
    }
    case types.REGION_VISIBLE: {
      const index = regions.findIndex((region) => {
        return region.id === payload.id
      })

      return {
        ...state,
        badgeNumber: payload.visible?badgeNumber + 1:badgeNumber,
        regions: updateObjectInArray(
          regions,
          {index: index, item: {
            ...regions[index],
            visible: payload.visible
          }}
        )
      }
    }
    case types.LOCATION_UPDATE: {

      let newState = {
        ...state,
        currentLocation: {
          latitude: payload.coords.latitude,
          longitude: payload.coords.longitude
        },
        distanceWalked: currentLocation?
          (distanceWalked?distanceWalked:0) + getDistance(
            {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            },
            payload.coords
          ):0,
        path: [
          ...path,
          {
            latitude: payload.coords.latitude,
            longitude: payload.coords.longitude
          }
        ]
      }

      return newState;
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

export function onMarkerVisible(id, visible) {
  return actionCreators.markerVisible(id)
}

export function onRegionAdd(payload) {
  return actionCreators.regionAdd(payload)
}

export function onRegionFound(id) {
  return actionCreators.regionFound(id)
}

export function onRegionVisible(id, visible) {
  return actionCreators.regionVisible(id, visible)
}

export function onLocationUpdate(payload) {
  return actionCreators.locationUpdate(payload)
}

export function onLocationViewAll() {
  return actionCreators.locationViewAll()
}
