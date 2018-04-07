import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Checkbox extends React.Component {

  componentDidUpdate = () => {
    this.checkbox.indeterminate = this.props.indeterminate;
  }

  checkboxRef = (ref) => {
    this.checkbox = ref;
  }

  handleChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.checked);
    }
  }

  render() {
    let {
      children,
      value,
      disabled,
      className,
      ...rest
    } = this.props;

    return (
      <label className={classnames('checkbox', className)} {...rest}>
        <input ref={this.checkboxRef} type="checkbox" checked={value} onChange={this.handleChange} disabled={disabled} />
        <i></i>
        {children}
      </label>
    );
  }
}

Checkbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Checkbox;