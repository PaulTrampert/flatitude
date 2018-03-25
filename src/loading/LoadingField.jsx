import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class LoadingField extends React.Component {
  render() {
    let {
      className,
      style,
      height,
      width
    } = this.props;

    let finalStyle = {
      ...style,
      height,
      width,
    };

    return (
      <div className={classnames(['loading', className])} style={finalStyle}>
      </div>
    );
  }
}

LoadingField.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default LoadingField;