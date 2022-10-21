export const sliceText = (value, sliceNumber) => {
  let result = value
  if (value.length > sliceNumber) {
    result = `${value.slice(0, sliceNumber)}...`
  }
  return result
}
