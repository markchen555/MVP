import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink exact activeClassName="active" to='/' >
          Home
        </NavLink>
        <NavLink activeClassName="active" to='/main' >
          Main
        </NavLink>
      </div>
    );
  }
}

export default NavBar;