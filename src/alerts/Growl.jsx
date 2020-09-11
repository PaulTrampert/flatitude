import React from 'react';
import PropTypes from 'prop-types';
import ColorTypes from '../colors/ColorTypes.js';
import window from '../util/window.js';
import classnames from 'classnames';

class Growl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expiring: false
    };
  }

  componentDidMount = () => {
    let {
      durationMs,
    } = this.props;
    this.timer = window.setTimeout(this.handleExpire, durationMs);
    this.ref && this.ref.addEventListener('animationend', this.onFadeoutEnd);
  }

  componentWillUnmount = () => {
    this.ref && this.ref.removeEventListener('animationend', this.onFadeoutEnd);
  }

  onFadeoutEnd = (event) => {
    if (event.animationName === 'growl-fadeout') {
      this.props.onExpire(this.props.id);
    }
  }

  handleExpire = () => {
    delete this.timer;
    this.setState({expiring: true});
  }

  handleRef = (ref) => {
    this.ref = ref;
  }

  handleDismiss = () => {
    let {
      id,
      onDismiss
    } = this.props;
    this.timer && window.clearTimeout(this.timer);
    delete this.timer;
    onDismiss(id);
  }

  render() {
    let {
      children,
      type,
    } = this.props;
    let {
      expiring
    } = this.state;
    return (
      <div ref={this.handleRef} className={classnames("growl", type, expiring && 'expiring')}>
        <div className="icon">
        </div>
        <div className="message">
          {children}
        </div>
        <div className="dismiss">
          <button onClick={this.handleDismiss}>
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