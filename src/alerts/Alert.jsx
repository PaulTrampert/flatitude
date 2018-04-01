import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ColorTypes from '../colors/ColorTypes.js';

class Alert extends React.Component {

  renderIcon = () => {
    let {type} = this.props;
    let iconClass = 'info';
    switch(type) {
    case 'info':
      iconClass = 'fa-info-circle';
      break;
    case 'warning':
    case 'danger':
      iconClass = 'fa-exclamation-triangle';
      break;
    case 'success':
      iconClass = 'fa-check-circle';
      break;
    default:
      iconClass = 'fa-info-circle';
    }

    return <i className={classnames('fa', iconClass)}></i>;
  }

  render() {
    let {
      type,
      children,
      className,
      action
    } = this.props;

    return (
      <div className={classnames(['alert', type, className])}>
        <div className="icon">
          {this.renderIcon()}
        </div>
        <div className="message">
          {children}
        </div>
        {
          action &&
          (
            <a className="action" onClick={action.onClick}>
              {action.label}
            </a>
          )
        }
      </div>
    );
  }
}

Alert.propTypes = {
  type: ColorTypes.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  })
};

export default Alert;