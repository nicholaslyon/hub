import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from "./List";
import Add from "./Add";

class Task extends Component {
  constructor(props) {
    super(props);

    this.onChecked = this.onChecked.bind(this);
  }

  onChecked() {
    const { onTaskChecked, id } = this.props;
    onTaskChecked(id);
  }

  render() {
    const { name, subTasks, onAddClicked, onTaskChecked, isDone, parentChecked } = this.props;

    return (
      <li className="tasker__task-wrapper">
        <div className="tasker__task">
          {!parentChecked &&
            <input
              className="tasker__checkbox"
              type="checkbox"
              checked={isDone}
              onChange={this.onChecked}/>
          }
          <div className="tasker__name">
            { name }
            {onAddClicked &&
              <Add onClick={onAddClicked}/>
            }
          </div>
        </div>
        {(subTasks && !!subTasks.length) &&
          <List
            tasks={subTasks}
            onTaskChecked={onTaskChecked}
            parentChecked={isDone} />
        }
      </li>
    );
  }
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onTaskChecked: PropTypes.func.isRequired,
  subTasks: PropTypes.array,
  onAddClicked: PropTypes.func,
  parentChecked: PropTypes.bool,
};

export default Task;
