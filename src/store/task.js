import { createSlice, createAction } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    taskAdded(state, action) {
      state.entities.push(action.payload)
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter((t) => t.id !== action.payload.id)
    },
    loadTasksReqested(state) {
      state.isLoading = true
    },
    taskReqestFailed(state, action) {
      state.isLoading = false
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const {
  update,
  remove,
  received,
  taskAdded,
  loadTasksReqested,
  taskReqestFailed,
} = actions

const taskReqested = createAction('task/taskReqested')

export const loadTasks = () => async (dispatch) => {
  dispatch(loadTasksReqested())
  try {
    const { data } = await todosService.fetch()
    dispatch(received(data))
  } catch (error) {
    dispatch(taskReqestFailed())
    dispatch(setError(error.message))
  }
}

export const addTask = (task) => async (dispatch) => {
  dispatch(taskReqested())
  try {
    const { data } = await todosService.create(task)
    dispatch(taskAdded(data))
  } catch (error) {
    dispatch(taskReqestFailed())
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }))
}
export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` })
}
export function taskDeleted(id) {
  return remove({ id })
}

export const getTasks = () => (state) => state.task.entities
export const getTasksLoadingStatus = () => (state) => state.task.isLoading

export default taskReducer
