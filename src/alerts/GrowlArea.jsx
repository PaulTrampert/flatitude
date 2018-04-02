import React from 'react';
import RenderInBody from '../util/RenderInBody.jsx';
import Growl from './Growl.jsx';

class GrowlArea extends React.Component {
  render() {
    return (
      <RenderInBody>
        <div className="growl-area">
          <Growl type="success">
            Success
          </Growl>
          <Growl type="danger">
            Danger
          </Growl>
          <Growl type="warning">
            Warning
          </Growl>
          <Growl type="info">
            Info
          </Growl>
        </div>
      </RenderInBody>
    );
  }
}

export default GrowlArea;