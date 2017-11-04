import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getPassthroughProps from '../util/getPassthroughProps.js';

class Nav extends React.Component {

  constructor(props) {
    super(props);
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
    else if (this.nav) {
      style.height = this.nav.scrollHeight;
    }

    return (
      <nav ref={nav => this.nav = nav} className={classnames(classes)} style={style} {...getPassthroughProps(this)}>
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