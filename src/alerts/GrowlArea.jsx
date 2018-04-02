import React from 'react';
import RenderInBody from '../util/RenderInBody.jsx';

class GrowlArea extends React.Component {
  render() {
    return (
      <RenderInBody>
        <div className="growl-area">
          <div className="growl success">
            <div className="icon">
            </div>
            <div className="message">
              Success
            </div>
            <div className="dismiss">
              <button>
              </button>
            </div>
          </div>
          <div className="growl danger">
            <div className="icon">
            </div>
            <div className="message">
              Danger
            </div>
            <div className="dismiss">
              <button>
              </button>
            </div>
          </div>
          <div className="growl warning">
            <div className="icon">
            </div>
            <div className="message">
              Warning
            </div>
            <div className="dismiss">
              <button>
              </button>
            </div>
          </div>
          <div className="growl info">
            <div className="icon">
            </div>
            <div className="message">
              Info
            </div>
            <div className="dismiss">
              <button>
              </button>
            </div>
          </div>
        </div>
      </RenderInBody>
    );
  }
}

export default GrowlArea;