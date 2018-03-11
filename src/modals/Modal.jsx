import React from 'react';
import PropTypes from 'prop-types';
import RenderInBody from '../util/RenderInBody.jsx';

class Modal extends React.Component {

  render() {
    return (
      <RenderInBody>
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </RenderInBody>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node
};

export default Modal;