import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../util/getDisplayName.js';
import getPassthroughProps from '../util/getPassthroughProps.js';

function withValidation(WrappedComponent, options = {}) {
  let opts = {
    validationEvent: 'onChange',
    validationValue: 'value',
    ...options
  };

  class WithValidation extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        validating: false,
        validationErrors:[]
      };
    }

    async validate(e) {
      let {
        validators,
        onValidate
      } = this.props;
      let onChange = this.props[opts.validationEvent] || (() => {});
      onChange(e);
      this.setState({validating: true});
      let results = await Promise.all(validators.map(validator => validator(e.target[opts.validationValue])));
      onValidate(results);
      this.setState({
        validating: false,
        validationErrors: results.filter(r => !!r)
      });
    }

    render() {
      let rest = {...(getPassthroughProps(this))};
      
      rest[opts.validationEvent] = e => this.validate(e);

      return (<WrappedComponent validationState={this.state} {...rest} />);
    }
  }

  WithValidation.propTypes = {
    validators: PropTypes.arrayOf(PropTypes.func),
    onValidate: PropTypes.func
  };

  WithValidation.defaultProps = {
    validators: [],
    onValidate: () => {}
  };

  WithValidation.displayName = `WithValidation(${getDisplayName(WrappedComponent)})`;

  return WithValidation;
}

export default withValidation;