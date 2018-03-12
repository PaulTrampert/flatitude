import React from 'react';
import PropTypes from 'prop-types';

class Footer extends React.Component {

  render() {
    return (
      <div className="modal-header">
        {this.props.children}
      </div>
    );
  }
}

Footer.propTypes = {
  children: PropTypes.node
};

export default Footer;