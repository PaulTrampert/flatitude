import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {
  Nav
} from '../src/flatitude.js';
import Home from './Home.jsx';
import Buttons from './Buttons.jsx';

let navTypes = [
  'left-nav',
  'right-nav',
  'default'
]

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navType: 0,
      navCollapsed: true,
      navCollapsedAnimated: false
    };
  }

  setNavCollapsed(navCollapsed) {
    this.setState({
      navCollapsed,
      navCollapsedAnimated: true
    });
  }

  cycleNavType() {
    let navType = this.state.navType + 1;
    if (navType === navTypes.length) {
      navType = 0;
    }
    this.setState({navType});
  }

  render() {
    return (
      <Router>
        <div className={`app ${navTypes[this.state.navType]}`}>
          <header>
            <h1>Flatitude</h1>
            <button className="transparent" onClick={() => this.cycleNavType()}>{navTypes[this.state.navType]}</button>
            <button className="transparent nav-toggle" onClick={() => this.setNavCollapsed(!this.state.navCollapsed)}><i className="icon-hamburger"></i></button>
          </header>
          <Nav collapsed={this.state.navCollapsed} animated={this.state.navCollapsedAnimated}>
            <Link to="/">Home</Link>
            <Link to="/buttons">Buttons</Link>
          </Nav>
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/buttons" component={Buttons} />
          </main>
          <footer>
            Copyright 2017 - Paul Trampert
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;