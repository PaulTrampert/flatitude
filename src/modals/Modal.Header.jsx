import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {

  render() {
    let {
      title,
      onClose,
      showClose
    } = this.props;

    return (
      <div className="modal-header">
        <span className="modal-title">
          {title}
        </span>
        {
          showClose &&
          <button className="close" onClick={onClose}><i className="fa fa-close"></i></button>
        }
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func,
  showClose: PropTypes.bool,
};

Header.defaultProps = {
  onClose: () => {}
};

export default Header;