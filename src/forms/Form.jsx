import React from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext.js';

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.form = new FormContext(props.name);
  }

  getChildContext() {
    return {form: this.form};
  }

  handleSubmit = async (event) => {
    let {
      onSubmit
    } = this.props;
    event.preventDefault();
    this.form.beginSubmit();
    try {
      if (this.form.isValid) {
        await onSubmit(event);
      }
    } catch (e) {
      console.error(e);
    }
    finally {
      this.form.endSubmit();
    }
  }

  render() {
    let {children} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.node
};

Form.childContextTypes = {
  form: PropTypes.instanceOf(FormContext)
};

export default Form;