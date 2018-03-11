import React from 'react';
import {Modal} from '../src/flatitude.js';

class Modals extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    return (
      <div>
        <h1>Modals</h1>
        <button onClick={this.toggleModal}>Show Modal</button>
        {
          this.state.showModal &&
          <Modal>
          </Modal>
        }
      </div>
    );
  }
}

export default Modals;