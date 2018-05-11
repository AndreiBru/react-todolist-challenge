import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import { App } from './App';

jest.mock('react-redux', a => ({
  connect: () => WrappedComponent => WrappedComponent
}));

const todos = [
  {
    title: 'one',
    url:
      'http://todo-backend-webpy.herokuapp.com/9291c49388e7436387954a26d9caae79',
    completed: false
  },
  {
    order: 3,
    title: 'two',
    url:
      'http://todo-backend-webpy.herokuapp.com/655d30051db2491bb61457a50a643d7f',
    completed: true
  },
  {
    title: 'three',
    url:
      'http://todo-backend-webpy.herokuapp.com/dae40261aee54292bad5f3901a9a8a61',
    completed: true
  },
  {
    title: 'four',
    url:
      'http://todo-backend-webpy.herokuapp.com/3f5228a4396f43af9f04272a94a7ce33',
    completed: false
  },
  {
    order: 2,
    title: 'five',
    url:
      'http://todo-backend-webpy.herokuapp.com/ca541adf6a3d4c54adf4779f9fa6af9e',
    completed: false
  }
];

describe('App', () => {
  it('renders and matches snapshot', () => {
    const comp = renderer.create(
      <App todos={todos} fetchTodos={Function.prototype} />
    );

    expect(comp.toJSON()).toMatchSnapshot();
  });

  it('calls the fetchTodos handler upon mount', () => {
    const fetchTodosSpy = jest.fn();
    shallow(<App todos={todos} fetchTodos={fetchTodosSpy} />);

    expect(fetchTodosSpy).toHaveBeenCalledTimes(1);
  });

  it("updates the input's text when typing", () => {
    const comp = mount(<App todos={todos} fetchTodos={Function.prototype} />);

    const newValue = 'Make dinner';
    comp.find('input').simulate('change', { target: { value: newValue } });

    expect(comp.find('input').prop('value')).toBe(newValue);
  });

  it('calls the postTodo handler when clicking the add button', () => {
    const postTodoSpy = jest.fn();
    const comp = mount(
      <App
        todos={todos}
        fetchTodos={Function.prototype}
        postTodo={postTodoSpy}
      />
    );

    const newValue = 'Make dinner';
    comp.find('input').simulate('change', { target: { value: newValue } });

    expect(comp.find('input').prop('value')).toBe(newValue);

    expect(postTodoSpy).not.toHaveBeenCalled();

    comp.find('[type="add"]').simulate('click');

    expect(postTodoSpy).toHaveBeenCalledTimes(1);
    expect(postTodoSpy).toHaveBeenCalledWith(newValue);
  });
});
