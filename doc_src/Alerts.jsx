import React from 'react';
import Alert from '../src/alerts/Alert.jsx';
import Button from '../src/buttons/Button.jsx';
import GrowlArea from '../src/alerts/GrowlArea.jsx';

class Alerts extends React.Component {
  render() {
    return (
      <div>
        <GrowlArea/>
        <h2>Alerts</h2>
        <Alert type="info">This is an info alert with no action.</Alert>
        <Alert type="success">This is a success alert with no action.</Alert>
        <Alert type="warning">This is a warning alert with no action.</Alert>
        <Alert type="warning" action={{label: 'dismiss', onClick: () => {}}}>This is a warning alert with an action.</Alert>
        <Alert type="danger">This is a danger alert with no action.</Alert>
        <Alert type="danger" action={{label: 'dismiss', onClick: () => {}}}>This is a danger alert with an action.</Alert>

        <h2>Growls</h2>
        <Button type="primary">Show Growl</Button>
      </div>
    );
  }
}

export default Alerts;