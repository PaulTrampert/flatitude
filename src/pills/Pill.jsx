import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ColorTypes from '../colors/ColorTypes.js';

class Pill extends React.Component {

  render() {
    let {
      className,
      type,
      children,
      ...rest
    } = this.props;
    return <span className={classnames("pill", type, className)} {...rest}>{children}</span>;
  }
}

Pill.propTypes = {
  className: PropTypes.string,
  type: ColorTypes,
  children: PropTypes.node
};

Pill.defaultProps = {
  type: 'primary'
};

export default Pill;