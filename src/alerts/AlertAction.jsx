import React from 'react';
import PropTypes from 'prop-types';

class AlertAction extends React.Component {

  handleActionClick = () => {
    let {
      alertId,
      onClick
    } = this.props;

    onClick({alertId});
  }

  render() {
    let {
      label
    } = this.props;

    return (
      <a className="action" onClick={this.handleActionClick}>
        {label}
      </a>
    );
  }
}

AlertAction.propTypes = {
  alertId: PropTypes.number,
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AlertAction;