import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Main from './Main'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path='/' component={Home} />
          <Route path='/main' component={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;