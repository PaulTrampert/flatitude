import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Th extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    let {
      onSort,
      sortDirection,
      name
    } = this.props;
    if (onSort) {
      onSort(sortDirection === 'asc' ? 'desc' : 'asc', name);
    }
  }

  render() {
    let {
      children,
      onSort,
      sortDirection,
      className,
      ...rest
    } = this.props;

    let classes = [
      className,
      sortDirection
    ];
    if (onSort) {
      classes.push('sortable');
    }

    return (
      <th className={classnames(classes)} onClick={this.handleClick} {...rest}>
        {children}        
      </th>
    );
  }
}

Th.propTypes = {
  children: PropTypes.node,
  onSort: PropTypes.func,
  sortDirection: PropTypes.oneOf(['asc', 'desc', '']),
  name: PropTypes.string,
  className: PropTypes.string
};

export default Th;