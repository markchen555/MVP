import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Favorite from './Favorite'

class App extends Component {
  constructor(){
    super()
    this.state ={
      videoId: null
    }
  }

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Route exact path='/' component={Home} />
          <Route path='/Favorite' component={Favorite} saveYouTube={this.saveYouTube}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;