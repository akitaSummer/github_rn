export const updateArray = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    const temp = array[i]
    if (item === temp) {
      array.splice(i, 1)
      return
    }
  }
  array.push(item)
}

export const remove = (array, item, id) => {
  if (!array) return
  for (let i = 0; i < array.length; i++) {
    const val = array[i]
    if (item === val || (val && val[id] && val[id] === item[id])) {
      array.splice(i, 1)
    }
  }
  return array
}

export const isEqual = (arr1, arr2) => {
  if (!(arr1 && arr2)) {
    return false
  }
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0, l = arr1.length; i < l; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}
