import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ColorTypes from '../colors/ColorTypes.js';
import AlertAction from './AlertAction.jsx';

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
      id,
      type,
      children,
      className,
      actions
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
          actions &&
          actions.map((action, idx) => (
            <AlertAction {...action} key={idx} alertId={id} />
          ))
        }
      </div>
    );
  }
}

Alert.propTypes = {
  id: PropTypes.number,
  type: ColorTypes.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  }))
};

export default Alert;