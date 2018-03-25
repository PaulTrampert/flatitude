import React from 'react';
import {
  HashRouter as Router,
  Route,
  NavLink as Link
} from 'react-router-dom';
import {
  Nav
} from '../src/flatitude.js';
import Home from './Home.jsx';
import Buttons from './Buttons.jsx';
import Forms from './Forms.jsx';
import Modals from './Modals.jsx';
import Tables from './Tables.jsx';
import Tiles from './Tiles.jsx';
import Typography from './Typography.jsx';

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
    };
  }

  setNavCollapsed(navCollapsed) {
    this.setState({
      navCollapsed
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
            <h3>Flatitude</h3>
            <button className="transparent" onClick={() => this.cycleNavType()}>{navTypes[this.state.navType]}</button>
            <button className="transparent nav-toggle" onClick={() => this.setNavCollapsed(!this.state.navCollapsed)}><i className="fa fa-bars"></i></button>
          </header>
          <Nav collapsed={this.state.navCollapsed} onRequestCollapse={() => this.setNavCollapsed(true)}>
            <Link to="/" exact activeClassName="current">Home</Link>
            <Link to="/buttons" activeClassName="current">Buttons</Link>
            <Link to="/forms" activeClassName="current">Forms</Link>
            <Link to="/modals" activeClassName="current">Modals</Link>
            <Link to="/tables" activeClassName="current">Tables</Link>
            <Link to="/tiles" activeClassName="current">Tiles</Link>
            <Link to="/typography" activeClassName="current">Typography</Link>
            <hr/>
            <a href="https://github.com/PaulTrampert/flatitude" target="_blank">GitHub <i className="fa fa-external-link"></i></a>
          </Nav>
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/buttons" component={Buttons} />
            <Route path="/forms" component={Forms} />
            <Route path="/modals" component={Modals} />
            <Route path="/tables" component={Tables} />
            <Route path="/tiles" component={Tiles} />
            <Route path="/typography" component={Typography} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
