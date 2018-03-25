import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getPassthroughProps from '../util/getPassthroughProps.js';
import ColorTypes from '../colors/ColorTypes.js';

class ProgressBar extends React.Component {
  render() {
    let {
      className,
      progress,
      total,
      type
    } = this.props;
    return (
      <div className={classnames(['progress-bar', className])} {...getPassthroughProps(this)}>
        <div 
          className={classnames(['progress', `${type}-background`])}
          style={{
            width: `${(progress/total) * 100}%`
          }}
        >
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number,
  total: PropTypes.number,
  type: ColorTypes
};

ProgressBar.defaultProps = {
  progress: 0,
  total: 100,
  type: 'primary'
};

export default ProgressBar;