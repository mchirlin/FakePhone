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

export function removeObjectInArray(arr, index) {
  if (index === undefined || index == -1) return arr;
  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ]
}

export function addObjectToArrayAfterIndex(arr, action) {
  return [
    ...arr.slice(0, action.index),
    action.item,
    ...arr.slice(action.index)
  ]
}

export function moveObjectFromToIndex(arr, index, newIndex) {
  let obj = arr[index];

  let newArray;

  if (index < newIndex) {
    newArray = [
      ...arr.slice(0, index),
      ...arr.slice(index + 1, newIndex),
      obj,
      ...arr.slice(newIndex + 1, arr.length)
    ];
  } else {
    newArray = [
      ...arr.slice(0, newIndex),
      obj,
      ...arr.slice(newIndex + 1, index),
      ...arr.slice(index + 1, arr.length)
    ];
  }

  return newArray;
}

export function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
