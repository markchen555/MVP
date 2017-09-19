import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <NavLink exact activeClassName="active" to='/' >
          Home
        </NavLink>
        <NavLink activeClassName="active" to='/favorite' >
          Favorite
        </NavLink>
      </div>
    );
  }
}

export default NavBar;