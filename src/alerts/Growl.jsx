import React from 'react';
import PropTypes from 'prop-types';
import ColorTypes from '../colors/ColorTypes.js';
import classnames from 'classnames';

class Growl extends React.Component {
  render() {
    let {
      id,
      children,
      type,
      onDismiss
    } = this.props;
    return (
      <div className={classnames("growl", type)}>
        <div className="icon">
        </div>
        <div className="message">
          {children}
        </div>
        <div className="dismiss">
          <button onClick={() => onDismiss(id)}>
          </button>
        </div>
      </div>
    );
  }
}

Growl.propTypes = {
  id: PropTypes.any.isRequired,
  children: PropTypes.node,
  type: ColorTypes.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Growl;