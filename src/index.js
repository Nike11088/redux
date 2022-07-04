import React, { useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import {
  completeTask,
  titleChanged,
  taskDeleted,
  loadTasks,
  getTasks,
  addTask,
  getTasksLoadingStatus,
} from './store/task'
import configureStore from './store/store'
import { getError } from './store/errors'

const store = configureStore()

const App = (params) => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const addNewTask = () => {
    dispatch(
      addTask({
        userId: 1,
        title: 'New Task',
        completed: false,
      })
    )
  }
  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  if (isLoading) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1> App</h1>
      <button onClick={() => addNewTask()}>Add task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Completed: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Remove</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
