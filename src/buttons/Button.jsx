import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Button extends React.Component {
  render() {
    let {
      type,
      children,
      className,
      ...rest
    } = this.props;

    return (
      <button className={classnames([type, className])} {...rest}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'danger']),
  children: PropTypes.node
};

export default Button;