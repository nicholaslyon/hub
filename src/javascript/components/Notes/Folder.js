import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Folder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, onClick } = this.props;

    return (
      <button
        className="notes__folder"
        onClick={onClick}
      >{name}</button>
    );
  }
}

Folder.propTypes = {
  onClick: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Folder;
