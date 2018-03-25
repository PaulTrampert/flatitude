import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getPassthroughProps from '../util/getPassthroughProps.js';
import document from '../util/document.js';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = () => {
    if (this.navRef && !this.navRef.contains(event.target)) {
      this.props.onRequestCollapse();
    }
  }

  saveNavRef = (ref) => {
    this.navRef = ref;
  }

  handleNavItemClick(originalOnClick, e) {
    if (originalOnClick) {
      originalOnClick(e);
    }
    this.props.onRequestCollapse(e);
  }

  render() {
    let {
      children,
      collapsed,
      className
    } = this.props;
    let classes = [className];

    let style = {};
    if (collapsed) {
      classes.push('collapsed');
    }

    return (
      <nav ref={this.saveNavRef} className={classnames(classes)} style={style} {...getPassthroughProps(this)}>
        {
          React.Children.map(children, child => {
            if (child.type !== "hr") {
              return React.cloneElement(child, {onClick: (e) => this.handleNavItemClick(child.props.onClick, e)});
            }
            else {
              return React.cloneElement(child);
            }
          })
        }
      </nav>
    );
  }
}

Nav.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  className: PropTypes.string,
  onRequestCollapse: PropTypes.func
};

Nav.defaultProps = {
  onRequestCollapse: () => {}
};

export default Nav;