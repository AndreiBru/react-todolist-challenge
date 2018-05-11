import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { List } from './';

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

describe('List', () => {
  it('renders and matches snapshot', () => {
    const comp = renderer.create(<List todos={todos} />);

    expect(comp.toJSON()).toMatchSnapshot();
  });

  it('calls the deleteTodo handler with the correct value', () => {
    const deleteTodoSpy = jest.fn();
    const comp = shallow(<List todos={todos} deleteTodo={deleteTodoSpy} />);

    expect(deleteTodoSpy).not.toHaveBeenCalled();

    const deleteTodoIndex = 2;

    comp
      .find('[type="delete"]')
      .at(deleteTodoIndex)
      .simulate('click');

    expect(deleteTodoSpy).toHaveBeenCalledTimes(1);
    expect(deleteTodoSpy).toHaveBeenCalledWith(todos[deleteTodoIndex]);
  });

  it('calls the toggleTodoCompleted handler with the correct value', () => {
    const toggleTodoCompletedSpy = jest.fn();
    const comp = shallow(
      <List todos={todos} toggleTodoCompleted={toggleTodoCompletedSpy} />
    );

    expect(toggleTodoCompletedSpy).not.toHaveBeenCalled();

    const toggleTodoCompleted = 2;

    comp
      .find('[type="edit"]')
      .at(toggleTodoCompleted)
      .simulate('click');

    expect(toggleTodoCompletedSpy).toHaveBeenCalledTimes(1);
    expect(toggleTodoCompletedSpy).toHaveBeenCalledWith(
      todos[toggleTodoCompleted]
    );
  });
});
