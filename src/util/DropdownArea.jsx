import document from './document.js';
import React from 'react';
import PropTypes from 'prop-types';
import RenderInBody from './RenderInBody.jsx';
import getPassthroughProps from './getPassthroughProps.js';

class DropdownArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
    if (this.divRef) {
      let boundingRect = this.divRef.getBoundingClientRect();
      this.menuStyle = {
        position: 'absolute',
        top: boundingRect.bottom + window.scrollY,
        right: window.outerWidth - (boundingRect.right + window.scrollX)
      };
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.closeMenu();
    }
  }

  saveDivRef = ref => {
    this.divRef = ref;
  }

  saveDropdownRef = ref => {
    this.dropdownRef = ref;
  }

  openMenu = () => {
    this.setState({isOpen: true});
  }

  closeMenu = () => {
    this.setState({isOpen: false});
  }

  handleClick = (event) => {
    let {
      onClick
    } = this.props;
    this.openMenu();
    onClick(event);
  }

  handleItemClick = (originalOnClick, e) => {
    if (originalOnClick) {
      originalOnClick(e);
    }

    this.closeMenu();
  }

  render() {
    let {
      children,
      dropdown,
    } = this.props;

    let {
      isOpen
    } = this.state;

    return (
      <div ref={this.saveDivRef} onClick={this.handleClick} {...getPassthroughProps(this)}>
        {children}
        {
          isOpen &&
          <RenderInBody>
            <div ref={this.saveDropdownRef} className="dropdown" style={this.menuStyle}>
              {
                dropdown.map(child => {
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
      </div>
    );
  }
}

DropdownArea.propTypes = {
  children: PropTypes.node,
  dropdown: PropTypes.node,
  onClick: PropTypes.func
};

DropdownArea.defaultProps = {
  onClick: () => {},
  dropdown: []
};

export default DropdownArea;