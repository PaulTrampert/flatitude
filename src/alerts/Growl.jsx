import React from 'react';
import PropTypes from 'prop-types';
import ColorTypes from '../colors/ColorTypes.js';
import window from '../util/window.js';
import classnames from 'classnames';

class Growl extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    let {
      durationMs,
    } = this.props;
    this.timer = window.setTimeout(this.handleExpire, durationMs);
  }

  handleExpire = () => {
    let {
      id,
      onExpire
    } = this.props;

    onExpire(id);
  }

  render() {
    let {
      id,
      children,
      type,
      onDismiss
    } = this.props;
    return (
      <div className={classnames("growl", type)}>
        <div className="icon">
        </div>
        <div className="message">
          {children}
        </div>
        <div className="dismiss">
          <button onClick={() => onDismiss(id)}>
          </button>
        </div>
      </div>
    );
  }
}

Growl.propTypes = {
  id: PropTypes.any.isRequired,
  children: PropTypes.node,
  type: ColorTypes.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onExpire: PropTypes.func.isRequired,
  durationMs: PropTypes.number
};

Growl.defaultProps = {
  durationMs: 10000
};

export default Growl;