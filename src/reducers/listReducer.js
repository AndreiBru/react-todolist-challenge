import {
  DISPLAY_ERROR,
  RESTORE_SNAPSHOT,
  FIX_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_TODOS,
  ADD_TODO,
} from '../actions/types';

const initialState = {todos: [], errorMessage: null};

const ListReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_TODOS:
      return {...state, todos: action.todos, todosSnapshot: action.todos};

    case ADD_TODO:
      newState = {
        ...state,
        errorMessage: null,
        todosSnapshot: state.todos.slice(),
        todos: [
          ...state.todos,
          {title: action.todo.title, url: action.todo.url},
        ],
      };

      return newState;

    case DELETE_TODO:
      newState = {
        ...state,
        errorMessage: null,
        todosSnapshot: state.todos.slice(),
        todos: state.todos.filter(todo => {
          if (todo.url === action.todo.url) {
            return false;
          }
          return true;
        }),
      };

      return newState;

    case UPDATE_TODO:
      newState = {
        ...state,
        errorMessage: null,
        todosSnapshot: state.todos.slice(),
        todos: state.todos.map(todo => {
          if (todo.url === action.todo.url) {
            return {...todo, completed: !todo.completed};
          }
          return todo;
        }),
      };

      return newState;

    case FIX_TODO:
      newState = {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.url === action.payload.url) {
            return action.payload.newTodo;
          }
          return todo;
        }),
      };

      return newState;

    case RESTORE_SNAPSHOT:
      newState = {...state, todos: state.todosSnapshot.slice()};

      return newState;

    case DISPLAY_ERROR:
      newState = {...state, errorMessage: action.errorMessage};

      return newState;

    default:
      return state;
  }
};

export default ListReducer;
