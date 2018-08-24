/* eslint react/no-find-dom-node: 0 */
import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ButtonTypes from './ButtonTypes.js';
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
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.menuRef && !this.menuRef.contains(event.target)) {
      this.closeMenu();
    }
  }

  openMenu = () => {
    let buttonElement = ReactDOM.findDOMNode(this.button);
    let boundingRect = buttonElement.getBoundingClientRect();
    this.menuStyle = {
      position: 'fixed',
      top: boundingRect.bottom,
      left: boundingRect.left
    };
    this.setState({isOpen: true});
  }

  closeMenu = () => {
    this.setState({isOpen: false});
  }

  setButtonRef = (ref) => {
    if (ref) {
      this.button = ref;
    }
  }

  setMenuRef = (ref) => {
    this.menuRef = ref;
  }

  handleItemClick = (originalOnClick, e) => {
    if (originalOnClick) {
      originalOnClick(e);
    }
    this.closeMenu();
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
      <button 
        ref={this.setButtonRef}
        type="button" 
        className={classnames([className, type])} 
        onClick={this.openMenu} 
        {...rest}
      >
        {title}&nbsp;<i className="fa fa-caret-down"></i>
        {
          isOpen &&
          <RenderInBody>
            <div ref={this.setMenuRef} className="dropdown" style={this.menuStyle}>
              {
                React.Children.map(children, child => {
                  if (child.type !== "hr") {
                    return React.cloneElement(child, {onClick: (e) => this.handleItemClick(child.props.onClick, e)});
                  }
                  else {
                    return React.cloneElement(child);
                  }
                })
              }
            </div>
          </RenderInBody>
        }
      </button>
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