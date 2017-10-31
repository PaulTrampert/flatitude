import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
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
      navType: 0
    };
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
          </header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/buttons">Buttons</Link>
          </nav>
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