import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Add extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick } = this.props;

    return (
      <button
        className="tasker__add"
        onClick={onClick}
      >+</button>
    );
  }
}

Add.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Add;
