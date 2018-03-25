import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Spinner extends React.Component {

  render() {
    let {
      className,
      ...rest
    } = this.props;

    return <i className={classnames(['fa', 'fa-spinner', 'fa-spin', className])} {...rest}></i>;
  }
}

Spinner.propTypes = {
  className: PropTypes.string
};

export default Spinner;