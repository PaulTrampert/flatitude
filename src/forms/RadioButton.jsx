import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getPassthroughProps from '../util/getPassthroughProps';

class RadioButton extends React.Component {

  handleChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    let {
      children,
      value,
      disabled,
      className,
      name,
      selected
    } = this.props;

    return (
      <label className={classnames('radio', className)} {...getPassthroughProps(this)}>
        <input type="radio" value={value} name={name} checked={selected} onChange={this.handleChange} disabled={disabled} />
        <i><i></i></i>
        {children}
      </label>
    );
  }
}

RadioButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};

export default RadioButton;