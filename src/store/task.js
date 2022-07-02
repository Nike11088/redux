import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    create(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id)
      state[elementIndex] = {
        ...state[elementIndex],
        ...action.payload,
      }
    },
    remove(state, action) {
      return state.filter((t) => t.id !== action.payload.id)
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, set, create } = actions

export const getTasks = () => async (dispatch) => {
  try {
    const { data } = await todosService.fetch()
    dispatch(set(data))
  } catch (error) {}
}

export const createTask = () => async (dispatch, getState) => {
  try {
    const { data } = await todosService.create()
    dispatch(create(data))
  } catch (error) {
    console.error(error)
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }))
}
export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` })
}
export function taskDeleted(id) {
  return remove({ id })
}

export default taskReducer
