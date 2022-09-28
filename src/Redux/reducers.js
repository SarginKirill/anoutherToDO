import { combineReducers } from 'redux'
import {
  ADD_CATEGORY,
  ADD_TODO,
  ADD_USER,
  DELETE_CATEGORY,
  EXIT_USER,
  FILTER_CATEGORY,
  LOGIN_USER,
  REMOVE_TODO,
  TOGGLE_TODO,
} from './actions'

const initialStateUsers = {
  users: [
    {
      name: 'admin',
      password: 'admin',
      id: 1,
      categories: ['Все задачи'],
    },
    {
      name: '1',
      password: '1',
      id: 2,
      categories: ['Все задачи', 'категория'],
    },
  ],
}

const initialStateTasks = {
  chooseCategory: 'Все задачи',
  todos: [
    {
      text: 'Test todo from state',
      userID: 2,
      taskID: 1,
      completed: false,
      cat: 'категория',
    },
    {
      text: 'Test todo from state',
      userID: 1,
      taskID: 12,
      completed: false,
      cat: 'Все задачи',
    },
    {
      text: 'Test todo from state',
      userID: 2,
      taskID: 18,
      completed: false,
      cat: 'Все задачи',
    },
    {
      text: 'Test todo from sate',
      userID: 2,
      taskID: 112,
      completed: false,
      cat: 'Все задачи',
    },
  ],
}

const taskReducer = (state = initialStateTasks, action) => {
  switch (action.type) {
    case TOGGLE_TODO: //A
      const test = [...state.todos].find(
        (el) => el.taskID === action.payload.taskID
      )
      test.completed = !test.completed

      return {
        ...state,
        todos: [...state.todos],
      }

    case REMOVE_TODO: //A
      const task = [...state.todos].indexOf(action.payload)

      state.todos.splice(task, 1)

      return {
        ...state,
        todos: [...state.todos],
      }

    case ADD_TODO: //A
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }

    case DELETE_CATEGORY: //A
      action.tasks.todos.map((task, index) => {
        if (task.completed && task.cat === action.filter) {
          state.todos.splice(index, 1)
        }
      })
      return {
        ...state,
        chooseCategory: 'Все задачи',
      }

    case FILTER_CATEGORY:
      return {
        ...state,
        chooseCategory: action.payload,
      }

    case EXIT_USER:
      return {
        ...state,
        chooseCategory: 'Все задачи',
      }

    default:
      return state
  }
}

const userReducer = (state = initialStateUsers, action) => {
  switch (action.type) {
    case ADD_USER: //A
      return {
        ...state,
        userOnline: action.payload,
        users: [...state.users, action.payload],
      }

    case LOGIN_USER: //A
      return {
        ...state,
        userOnline: action.payload,
      }

    case EXIT_USER:
      return {
        ...state,
        userOnline: null,
      }

    case ADD_CATEGORY: //A
      const user = action.payload.user
      const text = action.payload.value

      const globalUsers = state.users.find(
        (userOfAll) => userOfAll.id === user.id
      )
      globalUsers.categories.push(text)

      return {
        ...state,
        userOnline: { ...user },
      }

    case DELETE_CATEGORY: //A
      const userOnline = state.userOnline
      const allTodos = action.tasks.todos

      const actionTodos = allTodos.filter((task) => task.cat === action.filter)

      actionTodos.map((task, index) => {
        if (!task.completed) {
          task.cat = 'Все задачи'
        } else {
          actionTodos.splice(index, 1)
        }
      })

      const removeCategory = [...userOnline.categories].indexOf(action.filter)
      userOnline.categories.splice(removeCategory, 1)

      return {
        ...state,
      }

    default:
      return state
  }
}

export const rootReducer = combineReducers({
  taskData: taskReducer,
  userData: userReducer,
})
