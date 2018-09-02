import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert.jsx';
import alerter from './alerter.js';

class AlertArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: []
    };
  }

  componentDidMount = () => {
    this.unsub && this.unsub();
    this.unsub = alerter.subscribe(this.handleAlert, this.handleDismiss);
  }

  handleAlert = (alert) => {
    let {
      channels
    } = this.props;
    let {
      alerts
    } = this.state;

    if (!channels.length || channels.includes(alert.channel)) {
      this.setState({
        alerts: alerts.concat(alert)
      });
    }
  }

  handleDismiss = ({id, channel}) => {
    let {
      alerts,
    } = this.state;

    this.setState({
      alerts: alerts.filter(a =>
        (id && a.id !== id) ||
        (channel && a.channel !== channel)
      )
    });
  }

  componentWillUnmount = () => {
    this.unsub && this.unsub();
    delete this.unsub;
  }

  render() {
    let {
      alerts,
      className
    } = this.state;

    return (
      <div className={className}>
        {
          alerts.map(a => <Alert key={a.id} id={a.id} type={a.type} actions={a.actions}>{a.message}</Alert>)
        }
      </div>
    );
  }
}

AlertArea.propTypes = {
  className: PropTypes.string,
  channels: PropTypes.arrayOf(PropTypes.string)
};

AlertArea.defaultProps = {
  channels: []
};

export default AlertArea;