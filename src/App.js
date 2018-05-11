import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, postTodo } from './actions/listActions';

import './App.css';

import List from './components/list';
import Input from './components/input';
import Button from './components/button';

export class App extends Component {
  componentDidMount() {
    const { fetchTodos } = this.props;

    fetchTodos();
  }

  state = {
    currentTodo: '',
  };

  addTodo = () => {
    const { postTodo } = this.props;

    postTodo(this.state.currentTodo);

    this.setState({
      currentTodo: '',
    });
  };

  updateCurrentTodo = todo => {
    this.setState({
      currentTodo: todo,
    });
  };

  render() {
    const { todos, errorMessage } = this.props;

    return (
      <div className="container">
        <h1>Todo List</h1>

        <div className="add-item-to-list">
          <Input
            name="item"
            placeholder="New Item..."
            value={this.state.currentTodo}
            onChange={this.updateCurrentTodo}
          />
          <Button onClick={this.addTodo} type="add">
            Add
          </Button>
        </div>

        <List todos={todos} />

        <div className="error-message">{errorMessage}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state.list;

const mapDispatchToProps = { fetchTodos, postTodo };

export default connect(mapStateToProps, mapDispatchToProps)(App);
