import {updateObjectInArray} from './functions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  IMAGE_ADD: 'IMAGE_ADD',
  IMAGES_OPEN: 'IMAGES_OPEN'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  imageAdd: (payload) => {
    return {type: types.IMAGE_ADD, payload: payload}
  },
  imagesOpen: () => {
    return {type: types.IMAGES_OPEN}
  }
}

const initialState = {

}

export const photos = (state = initialState, action) => {
  const {badgeNumber, images} = state
  const {type, payload} = action

  switch (type) {
    case types.IMAGE_ADD: {
      return {
        ...state,
        badgeNumber: badgeNumber + 1,
        images: [
          ...images,
          payload
        ]
      }
    }
    case types.IMAGES_OPEN: {
      return {
        ...state,
        badgeNumber: 0
      }
    }
  }
  return state
}

export function onImageAdd(payload) {
  return actionCreators.imageAdd(payload)
}

export function onImagesOpen() {
  return actionCreators.imagesOpen()
}
