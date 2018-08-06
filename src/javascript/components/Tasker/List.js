import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from "./Task";

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks, onAddClicked, onTaskChecked, parentChecked } = this.props;

    return (
      <ul className="tasker__list">
        {tasks.map((task) => {
          return <Task
            {...task}
            key={task.id}
            onAddClicked={onAddClicked}
            onTaskChecked={onTaskChecked}
            parentChecked={parentChecked} />
        })}
      </ul>
    );
  }
}

List.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskChecked: PropTypes.func.isRequired,
  onAddClicked: PropTypes.func,
  parentChecked: PropTypes.bool,
};

export default List;
