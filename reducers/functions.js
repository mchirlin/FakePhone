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

export function formatSeconds(sec) {
  var sec = Math.round(sec)
  var hrs = Math.floor(sec / 3600);
  var min = Math.floor((sec - (hrs * 3600)) / 60);
  var seconds = sec - (hrs * 3600) - (min * 60);
  seconds = Math.round(seconds * 100) / 100

  var result = (hrs < 10 ? "0" + hrs : hrs);
  result += ":" + (min < 10 ? "0" + min : min);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);

  return result;
}
