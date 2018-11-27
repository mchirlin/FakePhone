import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  PHOTO_ADD: 'PHOTO_ADD',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  photoAdd: (photo) => {
    return {type: types.PHOTO_ADD, payload: photo}
  },
}

// Initial state of the store
const initialState = {

}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const photos = (state = initialState, action) => {
  const {photos} = state
  const {type, payload} = action

  switch (type) {
    case types.PHOTO_ADD: {
      return {
        ...state,
        photos: [
          ...photos,
          payload
        ]
      }
    }
  }
  return state
}

export function onPhotoAdd(photo) {
  return actionCreators.photoAdd(photo)
}
