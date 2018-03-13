import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import document from './document.js';

class RenderInBody extends React.Component {

  componentDidMount = () => {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    ReactDOM.render(this.props.children, this.element);
  }

  componentWillUnmount = () => {
    if (this.element) {
      ReactDOM.unmountComponentAtNode(this.element);
      document.body.removeChild(this.element);
      this.element = null;
    }
  }

  render() {
    return null;
  }
}

RenderInBody.propTypes = {
  children: PropTypes.node
};

export default RenderInBody;