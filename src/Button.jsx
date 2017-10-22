import React from 'react';
import PropTypes from 'prop-types';

function Button({type, onClick, disabled, children}) {
  return(
    <button className={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.oneOf(PropTypes.node, PropTypes.arrayOf(PropTypes.node))
};

Button.defaultProps = {
  onClick: () => {}
};

export default Button;