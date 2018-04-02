import React from 'react';
import PropTypes from 'prop-types';
import ColorTypes from '../colors/ColorTypes.js';
import classnames from 'classnames';

class Growl extends React.Component {
  render() {
    let {
      children,
      type
    } = this.props;
    return (
      <div className={classnames("growl", type)}>
        <div className="icon">
        </div>
        <div className="message">
          {children}
        </div>
        <div className="dismiss">
          <button>
          </button>
        </div>
      </div>
    );
  }
}

Growl.propTypes = {
  children: PropTypes.node,
  type: ColorTypes.isRequired
};

export default Growl;