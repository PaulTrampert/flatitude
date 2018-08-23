import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownButton from './DropdownButton.jsx';
import ButtonTypes from './ButtonTypes.js';

class ActionDropdown extends React.Component {

  render() {
    let {
      children,
      type,
      title,
      onClick,
      className
    } = this.props;

    return (
      <span className="action-dropdown">
        <button onClick={onClick} type="button" className={classnames(['action', className, type])}>{title}</button>
        <DropdownButton type={type} className={classnames(['drop', className])}>{children}</DropdownButton>
      </span>
    );
  }
}

ActionDropdown.propTypes = {
  children: PropTypes.node,
  type: ButtonTypes,
  title: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default ActionDropdown;