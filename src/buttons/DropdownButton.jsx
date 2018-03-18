/* eslint react/no-find-dom-node: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import ButtonTypes from './ButtonTypes.js';
import window from '../util/window.js';
import document from '../util/document.js';
import RenderInBody from '../util/RenderInBody.jsx';

class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.buttonElement && !this.buttonElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  openMenu = () => {
    this.setState({isOpen: true});
  }

  closeMenu = () => {
    this.setState({isOpen: false});
  }

  setButtonRef = (ref) => {
    if (ref) {
      this.buttonElement = ReactDOM.findDOMNode(ref);
      let boundingRect = this.buttonElement.getBoundingClientRect();
      this.menuStyle = {
        position: 'absolute',
        top: boundingRect.bottom + window.scrollY,
        right: window.outerWidth - (boundingRect.right + window.scrollX)
      };
    }
  }

  render() {
    let {
      className,
      type,
      title,
      children,
      ...rest
    } = this.props;
    let {
      isOpen
    } = this.state;

    return (
      <Button 
        ref={this.setButtonRef}
        type={type} 
        className={className} 
        onClick={this.openMenu} 
        {...rest}
      >
        {title}&nbsp;<i className="fa fa-caret-down"></i>
        {
          isOpen &&
          <RenderInBody>
            <div className="dropdown" style={this.menuStyle}>
              {children}
            </div>
          </RenderInBody>
        }
      </Button>
    );
  }
}

DropdownButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  type: ButtonTypes,
  children: PropTypes.node
};

export default DropdownButton;