import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(){
    super()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.location}</h1>
        <h2>Weather: {this.props.weather}</h2>
        <h3>Temperture: {this.props.temp}</h3>
        <h3>From: {this.props.tempMax} To: {this.props.tempMin}</h3>
      </div>
    );
  }
}

export default Home;
