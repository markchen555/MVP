import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(){
    super()
    this.state = {
      location: null,
      weather: null,
      temp: null,
      temp_min: null,
      temp_max: null,
      youtube_search_videoId: null,
      youtube_search_array: null,
      youtube_search_title: null
    }
  }

  componentDidMount() {
    this.getWeather()
  }
  
  getTemp(digit){
    var temp = Math.round(10*( digit-273.15))/10 ;
    return Math.floor(temp * (9/5) + 32) + ' ' +'F';
  }

  getRandomSearch(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getWeather() {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Los_Angeles&appid=b441a6ceb682e6d4997c3fbd50d17ef7')
    .then((data) => {
      console.log('Successfully get data from weather api')
      console.log('this is data: ', data.data)
      this.setState({
        location: data.data.name, 
        weather: data.data.weather[0].description,
        temp: this.getTemp(data.data.main.temp),
        temp_min: this.getTemp(data.data.main.temp_min),
        temp_max: this.getTemp(data.data.main.temp_max)
      })
      // Promises the getYouTube function
      this.getYouTube();
    })
    .catch(err => {
      console.log('Error occur when getting data from weather api: ', err)
    })
  }


  getYouTube() {
    axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: 'snippet',
        key: 'AIzaSyC4SWubXKHq46UfqeklCABDjmIJwdFLtnA',
        q: this.state.weather + ` song`,
        maxResults: 10,
        type: 'video',
        videoEmbeddable: 'true'
      }
    })
    .then((data) => {
      this.setState({
        // youtube_search: data.data.items[0].id.videoId, 
        youtube_search_videoId: data.data.items[this.getRandomSearch(data.data.items.length -1, 0)].id.videoId,
        youtube_search_array: data.data.items,
      })
      // console.log('this is youtube search: ', JSON.stringify(data.data.items,null, 2))
      console.log('this is youtube search Array: ', this.state.youtube_search_array)
    })
    .catch(err => {
      console.log('Fail to fatch data from YouTube')
    })
  }



  render() {
    return (
      <div>
        <div className="video-player">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.state.youtube_search_videoId + '?autoplay=1&loop=1&list=RDQMgEzdN5RuCXE'} allowFullScreen frameBorder="0" ></iframe>
          </div>
          <button className="btn btn-primary" >Favorite</button>
        </div>
        <h1>{this.state.location}</h1>
        <h2>Weather: {this.state.weather}</h2>
        <h2>Temperture: {this.state.temp}</h2>
        <h2>From: {this.state.temp_min} To: {this.state.temp_max}</h2>
      </div>
    );
  }
}

export default Home;

//window.YOUTUBE_API_KEY = 'AIzaSyC4SWubXKHq46UfqeklCABDjmIJwdFLtnA';
//https://www.googleapis.com/youtube/v3/search