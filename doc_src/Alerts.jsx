import React from 'react';
import Alert from '../src/alerts/Alert.jsx';

class Alerts extends React.Component {
  render() {
    return (
      <div>
        <Alert type="info">This is an info alert with no action.</Alert>
        <Alert type="success">This is a success alert with no action.</Alert>
        <Alert type="warning">This is a warning alert with no action.</Alert>
        <Alert type="warning" action={{label: 'dismiss', onClick: () => {}}}>This is a warning alert with an action.</Alert>
        <Alert type="danger">This is a danger alert with no action.</Alert>
        <Alert type="danger" action={{label: 'dismiss', onClick: () => {}}}>This is a danger alert with an action.</Alert>
      </div>
    );
  }
}

export default Alerts;