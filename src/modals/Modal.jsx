import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RenderInBody from '../util/RenderInBody.jsx';
import getPassthroughProps from '../util/getPassthroughProps.js';
import Header from './Modal.Header.jsx';
import Footer from './Modal.Footer.jsx';
import Body from './Modal.Body.jsx';

class Modal extends React.Component {

  render() {
    let {
      children,
      className,
      modalElement: ModalElement
    } = this.props;
    return (
      <RenderInBody>
        <div className="modal-overlay">
          <ModalElement className={classnames("modal", className)} {...getPassthroughProps(this)}>
            {children}
          </ModalElement>
        </div>
      </RenderInBody>
    );
  }
}

Modal.Header = Header;
Modal.Footer = Footer;
Modal.Body = Body;

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  modalElement: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Modal.defaultProps = {
  modalElement: 'div'
};

export default Modal;