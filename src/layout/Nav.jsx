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
      collapsed
    } = this.props;
    let classes = [];

    if (collapsed) {
      classes.push('collapsed');
    }

    return (
      <nav className={classnames(classes)} {...getPassthroughProps(this)}>
        {
          React.Children.map(children, child => {
            if (child.type !== "hr") {
              return React.cloneElement(child, {onClick: (e) => this.handleNavItemClick(child.onClick, e)});
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
  onRequestCollapse: PropTypes.func
};

Nav.defaultProps = {
  onRequestCollapse: () => {}
};

export default Nav;