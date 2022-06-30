import { taskUpdated, taskRemoved } from './actionTypes'

export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdated: {
      const newArray = [...state]
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      )
      newArray[elementIndex] = {
        ...newArray[elementIndex],
        ...action.payload,
      }
      return newArray
    }
    case taskRemoved: {
      const newArray = [...state].filter((t) => t.id !== action.payload.id)
      return newArray
    }
    default:
      return state
  }
}
