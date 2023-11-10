function maxValPropFromArray(arr, property) {
  const maxProperty = arr.reduce((max, obj) => {
    return Math.max(max, obj[property]);
  }, arr[0].order);

  return maxProperty;
}

module.exports = maxValPropFromArray;
