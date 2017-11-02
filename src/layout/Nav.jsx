import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {
      children,
      collapsed
    } = this.props;
    let classes = [];
    let style = {};
    if (collapsed) {
      classes.push('collapsed');
      style.height = 0;
      style.minHeight = 0;
    } else if (this.element) {
      style.minHeight = this.element.scrollHeight;
      style.height = this.element.scrollHeight;
    }

    return (
      <nav ref={element => this.element = element} className={classnames(classes)} style={style}>
        {children}
      </nav>
    );
  }
}

Nav.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  animated: PropTypes.bool
};

export default Nav;