import { updateObjectInArray } from '../functions/arrayFunctions';

export const types = {
  QR_FOUND: 'QR_FOUND'
}

export const actionCreators = {
  qrFound: (data) => {
    return {type: types.QR_FOUND, payload: data}
  }
}

const initialState = {
}

export const camera = (state = initialState, action) => {
  const {badgeNumber, qrCodes} = state;
  const {type, payload} = action;

  switch (type) {
    case types.QR_FOUND: {
      const index = qrCodes.findIndex((qrCode) => {
        return qrCode.id === payload.id
      })

      if (qrCodes[index].found) return state;

      return {
        ...state,
        qrCodes: updateObjectInArray(
          qrCodes,
          {index: index, item: {
            ...qrCodes[index],
            found: true
          }}
        )
      }
    }
  }
  return state
}

export function onQrFound(payload) {
  return actionCreators.qrFound(payload)
}
