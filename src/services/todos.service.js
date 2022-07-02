import httpService from './http.service'

const todosEndpoint = 'todos/'

const todosService = {
  fetch: async () => {
    const data = httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    })
    return data
  },
  create: async () => {
    const data = httpService.post(todosEndpoint, {
      title: 'New Task',
      completed: false,
    })
    return data
  },
}

export default todosService
