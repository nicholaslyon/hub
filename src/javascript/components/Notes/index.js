import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { generateUUID } from '../../utils';

class Notes extends Component {
  constructor(props) {
    super(props);

    // vars
    // this.input = null;
    //
    // // function binding
    // this.onTaskAdd = this.onTaskAdd.bind(this);
    //
    // // start state
    // this.state = {
    //   tasks: [],
    // }
  }

  render() {
    return (
      <div>
        <h1>notes</h1>
      </div>
    );
  }
}

Notes.propTypes = {};

export default Notes;
