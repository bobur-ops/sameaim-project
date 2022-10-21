import { v4 as uuidv4 } from 'uuid'

export const uniqueId = value => {
  const id = uuidv4()

  return `${value}-${id.slice(-12)}`
}
