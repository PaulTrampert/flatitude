import React from 'react';
import Alert from '../src/alerts/Alert.jsx';
import GrowlArea from '../src/alerts/GrowlArea.jsx';
import growler from '../src/alerts/growler.js';

const growlTypes = [
  'success',
  'danger',
  'warning',
  'info'
];

class Alerts extends React.Component {
  constructor(props) {
    super(props);

    this.idx = 0;
  }

  render() {
    return (
      <div>
        <GrowlArea/>
        <h2>Alerts</h2>
        <Alert type="info">This is an info alert with no action.</Alert>
        <Alert type="success">This is a success alert with no action.</Alert>
        <Alert type="warning">This is a warning alert with no action.</Alert>
        <Alert type="warning" actions={[{label: 'dismiss', onClick: () => {}}]}>This is a warning alert with an action.</Alert>
        <Alert type="danger">This is a danger alert with no action.</Alert>
        <Alert type="danger" actions={[{label: 'dismiss', onClick: () => {}}]}>This is a danger alert with an action.</Alert>

        <h2>Growls</h2>
        <button type="button" onClick={() => {
          growler.growl({
            type: growlTypes[this.idx],
            message: "I'm a growl"
          });
          this.idx++;
          if (this.idx >= 4) {
            this.idx = 0;
          }
        }} className="primary">Show Growl</button>
      </div>
    );
  }
}

export default Alerts;