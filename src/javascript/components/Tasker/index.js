import React, {Component} from 'react';
import PropTypes from 'prop-types';

import List from "./List";

import { generateUUID } from '../../utils';

class Index extends Component {
  constructor(props) {
    super(props);

    // vars
    this.input = null;

    // function binding
    this.onTaskAdd = this.onTaskAdd.bind(this);
    this.onAddClicked = this.onAddClicked.bind(this);
    this.onTaskChecked = this.onTaskChecked.bind(this);

    // start state
    this.state = {
      tasks: [],
    }
  }

  // TODO - add new input subtask
  // TODO - once task added, uncheck parent task
  onAddClicked() {
    console.log('clicked');
  }

  onTaskChecked(id) {
    // update data
    this.setState({ tasks: this.updateTaskData(this.state.tasks, id) });
  }

  updateTaskData(tasks, id, checkAll, checkAllValue) {
    return tasks.map((task) => {
      // check all and ignore rest
      if (checkAll) return Object.assign({}, task, { isDone: checkAllValue });

      // check is is checked task and if so, what is it's new value
      const isTask = task.id === id;
      const newValue = isTask ? !task.isDone : task.isDone;

      // update sub tasks and task accordingly
      if (task.subTasks) task.subTasks = this.updateTaskData(task.subTasks, isTask ? null : id, isTask, newValue);
      if (isTask) return Object.assign({}, task, { isDone: newValue });
      return task;
    });
  }

  onTaskAdd(evt) {
    // stop page refresh
    evt.preventDefault();

    // process input
    const newTask = this.processNewTaskString(this.input.value.trim());

    // set new state
    this.setState({ tasks: [newTask, ...this.state.tasks]});

    // clear value
    // TODO - this part of state?
    this.input.value = '';
  }

  processNewTaskString(taskString) {
    const task = {
      name: taskString,
      id: generateUUID(),
      isDone: false,
    };

    // only single add
    if (taskString.indexOf('/') === -1) return task;

    // new section add
    const taskParts = taskString.split('/');
    return Object.assign({}, task, {
      name: taskParts[0].trim(),
      subTasks: taskParts.splice(1).map((subTaskString) => {
        return {
          name: subTaskString.trim(),
          id: generateUUID(),
          isDone: false,
        }
      }),
    });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <h1>tasker</h1>
        <form onSubmit={this.onTaskAdd}>
          <input
            type="text"
            className="tasker__input"
            ref={ref => this.input = ref}
          />
        </form>
        {!!tasks.length &&
        <List
          tasks={tasks}
          onAddClicked={this.onAddClicked}
          onTaskChecked={this.onTaskChecked}
        />
        }
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
