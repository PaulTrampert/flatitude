import React from 'react';
import growler from './growler.js';
import Growl from './Growl.jsx';
import RenderInBody from '../util/RenderInBody.jsx';

class GrowlArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growls: []
    };
  }

  componentDidMount = () => {
    this.unsub = growler.subscribe(this.showGrowl);
  }

  componentWillUnmount = () => {
    this.unsub && this.unsub();
    delete this.unsub;
  }

  showGrowl = (growl) => {
    let growls = this.state.growls.slice();
    growls.push(growl);
    this.setState({
      growls
    });
  }

  handleExpire = (id) => {
    let growls = this.state.growls.slice();
    let idx = growls.findIndex(g => g.id === id);
    growls.splice(idx, 1)[0];
    this.setState({
      growls
    });
  }

  handleDismiss = (id) => {
    let growls = this.state.growls.slice();
    let idx = growls.findIndex(g => g.id === id);
    let growl = growls.splice(idx, 1)[0];
    growl.onDismiss();
    this.setState({
      growls
    });
  }

  render() {
    let {
      growls
    } = this.state;

    return (
      <RenderInBody>
        <div className="growl-area">
          {
            growls.map(g => (
              <Growl key={g.id} id={g.id} type={g.type} onDismiss={this.handleDismiss} onExpire={this.handleExpire}>
                {g.message}
              </Growl>
            ))
          }
        </div>
      </RenderInBody>
    );
  }
}

export default GrowlArea;