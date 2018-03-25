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
    if (this.divRef && !this.divRef.contains(event.target)) {
      this.closeMenu();
    }
  }

  saveDivRef = ref => {
    this.divRef = ref;
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
            <div className="dropdown" style={this.menuStyle}>
              {dropdown}
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
  onClick: () => {}
};

export default DropdownArea;