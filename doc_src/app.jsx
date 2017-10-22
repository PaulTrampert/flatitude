import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Flatitude from '../src/flatitude.js';
import Home from './Home.jsx';
import Buttons from './Buttons.jsx';

ReactDOM.render((
  <Router>
    <div class="app left-nav">
      <header>
        <h1>Flatitude</h1>
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
), document.getElementById('app'));