import axios from 'axios';
import {
  DISPLAY_ERROR,
  RESTORE_SNAPSHOT,
  FIX_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  ADD_TODO,
  GET_TODOS,
} from './types';

const addTodo = todo => ({
  type: ADD_TODO,
  todo,
});

const getTodos = todos => ({
  type: GET_TODOS,
  todos,
});

const updateTodo = todo => ({
  type: UPDATE_TODO,
  todo,
});

const removeTodo = todo => ({
  type: DELETE_TODO,
  todo,
});

const fixTodo = payload => ({
  type: FIX_TODO,
  payload,
});

const restoreSnapshot = () => ({
  type: RESTORE_SNAPSHOT,
});

const displayError = errorMessage => ({
  type: DISPLAY_ERROR,
  errorMessage,
});

export const postTodo = title => dispatch => {
  // NOTE: Simulating url as id due to the way the API is set up
  // ============================================================
  const url = new Date().getTime();

  dispatch(addTodo({title, url}));

  return axios
    .post('https://todo-backend-webpy.herokuapp.com/', {
      title,
    })
    .then(res => {
      dispatch(fixTodo({url, newTodo: res.data}));
    })
    .catch(() => {
      dispatch(displayError('There was an error while adding your todo.'));
      dispatch(restoreSnapshot());
    });
};

export const fetchTodos = () => dispatch => {
  return axios
    .get('https://todo-backend-webpy.herokuapp.com/')
    .then(res => {
      dispatch(getTodos(res.data));
    })
    .catch(() => {
      dispatch(
        displayError(
          'There was an error while fetching your todos. Please try again later.',
        ),
      );
    });
};

export const toggleTodoCompleted = todo => dispatch => {
  dispatch(updateTodo(todo));
  return axios
    .patch(todo.url, {
      completed: !todo.completed,
    })
    .then(res => {
      dispatch(fixTodo({url: todo.url, newTodo: res.data}));
    })
    .catch(() => {
      dispatch(displayError('There was an error while updating your todo.'));
      dispatch(restoreSnapshot());
    });
};

export const deleteTodo = todo => dispatch => {
  dispatch(removeTodo(todo));
  return axios
    .delete(todo.url)
    .then(() => {})
    .catch(() => {
      dispatch(displayError('There was an error while deleting your todo.'));
      dispatch(restoreSnapshot());
    });
};
