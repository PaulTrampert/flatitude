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
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    return (
      <div>
        <h1>Modals</h1>
        <button onClick={this.toggleModal}>Show Modal</button>
        {
          this.state.showModal &&
          <Modal>
            <Modal.Header title="Test Modal" showClose={true} onClose={this.toggleModal}/>
            <Modal.Body>
              This is the content of the modal.
            </Modal.Body>
            <Modal.Footer>
              <button className="primary" onClick={this.toggleModal}>Ok</button>
              <button onClick={this.toggleModal}>Cancel</button>
            </Modal.Footer>
          </Modal>
        }
      </div>
    );
  }
}

export default Modals;