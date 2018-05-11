import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodoCompleted, deleteTodo } from '../../actions/listActions';

import './index.css';
import Button from '../button';

export class List extends Component {
  deleteTodo = todo => {
    const { deleteTodo } = this.props;

    deleteTodo(todo);
  };

  toggleTodoCompleted = todo => {
    const { toggleTodoCompleted } = this.props;

    toggleTodoCompleted(todo);
  };

  render() {
    const { todos } = this.props;

    const renderTableRow = todo => (
      <tr key={todo.url}>
        <td className={todo.completed ? 'completed' : null}>{todo.title}</td>
        <td>
          <Button type="edit" onClick={() => this.toggleTodoCompleted(todo)}>
            Edit
          </Button>
          <Button type="delete" onClick={() => this.deleteTodo(todo)}>
            Delete
          </Button>
        </td>
      </tr>
    );

    return (
      <table>
        <thead>
          <tr>
            <th width="66%">Item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{todos.map(todo => renderTableRow(todo))}</tbody>
      </table>
    );
  }
}

const mapDispatchToProps = { toggleTodoCompleted, deleteTodo };

export default connect(null, mapDispatchToProps)(List);
