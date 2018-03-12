import React from 'react';
import PropTypes from 'prop-types';
import RenderInBody from '../util/RenderInBody.jsx';
import Header from './Modal.Header.jsx';
import Footer from './Modal.Footer.jsx';

class Modal extends React.Component {

  render() {
    let {
      children
    } = this.props;
    return (
      <RenderInBody>
        <div className="modal-overlay">
          <div className="modal">
            {children}
          </div>
        </div>
      </RenderInBody>
    );
  }
}

Modal.Header = Header;
Modal.Footer = Footer;

Modal.propTypes = {
  children: PropTypes.node
};

export default Modal;