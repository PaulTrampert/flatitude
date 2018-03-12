import React from 'react';
import PropTypes from 'prop-types';

class Body extends React.Component {

  render() {
    return (
      <div className="modal-body">
        {this.props.children}
      </div>
    );
  }
}

Body.propTypes = {
  children: PropTypes.node
};

export default Body;