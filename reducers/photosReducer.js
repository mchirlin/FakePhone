import {updateObjectInArray} from '../functions/arrayFunctions'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  IMAGE_ADD: 'IMAGE_ADD',
  IMAGE_VISIBLE: 'IMAGE_VISIBLE',
  IMAGES_OPEN: 'IMAGES_OPEN'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  imageAdd: (payload) => {
    return {type: types.IMAGE_ADD, payload: payload}
  },
  imageVisible: (id, visible) => {
    return {type: types.IMAGE_VISIBLE, payload: {
      id: id,
      visible: visible
    }}
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
    case types.IMAGE_VISIBLE: {
      const index = images.findIndex((image) => {
        return image.id === payload.id
      })

      return {
        ...state,
        badgeNumber: payload.visible?badgeNumber + 1:badgeNumber,
        images: updateObjectInArray(
          images,
          {index: index, item: {
            ...images[index],
            visible: payload.visible
          }}
        )
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

export function onImageVisible(id, visible) {
  return actionCreators.imageVisible(id, visible)
}

export function onImagesOpen() {
  return actionCreators.imagesOpen()
}
