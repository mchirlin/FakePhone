export function getKeyByKeyValue(o, k, v) {
  return Object.keys(o).find(key => o[key][k] === v);
}

export function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item
    }
  })
}

export function addObjectToArrayAfterIndex(arr, action) {
  return [
    ...arr.slice(0, action.index),
    action.item,
    ...arr.slice(action.index)
  ]
}
