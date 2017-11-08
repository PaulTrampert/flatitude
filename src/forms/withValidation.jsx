import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../util/getDisplayName.js';
import getPassthroughProps from '../util/getPassthroughProps.js';
import FormContext from './FormContext.js';
import Debouncer from '../util/Debouncer.js';

function withValidation(WrappedComponent) {

  class WithValidation extends React.Component {
    constructor(props, context) {
      super(props);

      this.state = {
        isSubmitting: false,
        hasSubmitted: false,
        needsValidation: true,
        validating: false,
        validationErrors:[]
      };

      this.debouncer = new Debouncer(props.debounceTime);

      if (context && context.form) {
        context.form.registerField(this);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({needsValidation: true});
      }
    }

    async componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) {
        try {
          this.setState({validating: true});
          let results = await this.debouncer.debounce(this.validate);
          this.setState({
            validating: false,
            needsValidation: false,
            validationErrors: results.filter(r => !!r)
          });
        } catch (error) {
          this.debouncer.swallowDebounce(error);
        }
      }
    }

    handleSubmitEvents(event) {
      this.setState({
        isSubmitting: event.isSubmitting,
        hasSubmitted: event.hasSubmitted
      });
    }

    validate = async () => {
      let {
        validators,
        value
      } = this.props;
      let results = await Promise.all(validators.map(validator => validator(value)));
      
      return results;
    }

    render() {
      let props = {...(getPassthroughProps(this))};
      props.value = this.props.value;
      
      return (<WrappedComponent {...(this.state)} {...props} />);
    }
  }

  WithValidation.propTypes = {
    validators: PropTypes.arrayOf(PropTypes.func),
    onValidate: PropTypes.func,
    value: PropTypes.any,
    debounceTime: PropTypes.number
  };

  WithValidation.defaultProps = {
    validators: []
  };

  WithValidation.contextTypes = {
    form: PropTypes.instanceOf(FormContext)
  };

  WithValidation.displayName = `WithValidation(${getDisplayName(WrappedComponent)})`;

  return WithValidation;
}

export default withValidation;