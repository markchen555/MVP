import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Home from './Home';
import Favorite from './Favorite';

class App extends Component {
  constructor(){
    super()
    this.state ={
      location: null,
      weather: null,
      temp: null,
      temp_min: null,
      temp_max: null,
      youtube_search_videoId: null,
      youtube_search_array: [],
      youtube_search_title: null,
      randomIndex: null,
      youtube_stored_array:[]
    }
    this.getVideos = this.getVideos.bind(this)
  }

  componentDidMount() {
    this.getWeather()
    this.getRandomSearch(9, 0)
    this.getVideos()
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
        youtube_search_title: data.data.items[this.state.randomIndex].snippet.title,
        youtube_search_videoId: data.data.items[this.state.randomIndex].id.videoId,
        youtube_search_array: data.data.items,
      })
      // console.log('this is youtube search: ', JSON.stringify(data.data.items,null, 2))
      // console.log('this is youtube search Array: ', this.state.youtube_search_array)
    })
    .catch(err => {
      console.log('Fail to fatch data from YouTube')
    })
  }

  getRandomSearch(max, min) {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setState({randomIndex: random})
  }
  
  getTemp(digit){
    var temp = Math.round(10*( digit-273.15))/10 ;
    return Math.floor(temp * (9/5) + 32) + ' ' +'F';
  }


  getWeather() {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Maryland&appid=b441a6ceb682e6d4997c3fbd50d17ef7')
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

  saveFaforite() {
    axios.post('/api/MVP', {
      videoTitle: this.state.youtube_search_title,
      videoId: this.state.youtube_search_videoId
    })
    .then(() => {
      console.log('Successfully Post to Database');
    })
    .catch(err => {
      console.log('Error Occur when Post to Databse: ', err)
    })
  }

  getVideos() {
    axios.get('/api/MVP')
    .then(data => {
      this.setState({youtube_stored_array: data.data})
    })
    .catch(err => {
      console.log('Error Occur when Fetching from Database: ', err)
    })
  }

  render() {
    console.log('stored:', this.state.youtube_stored_array )
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <div className="video-player">
            <div className="embed-responsive embed-responsive-16by9">
              
              <iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.state.youtube_search_videoId + '?autoplay=1&loop=1&list=RDQMgEzdN5RuCXE'} allowFullScreen frameBorder="0" ></iframe>
            </div>
            <button className="btn btn-primary" onClick={() => this.saveFaforite()} >Favorite</button>
          </div>
          <Route exact path='/' component={() => (<Home location={this.state.location} weather={this.state.weather} temp={this.state.temp} tempMax={this.state.temp_max} tempMin={this.state.temp_min} />)} />
          <Route path='/Favorite' component={() => (<Favorite videos={this.state.youtube_stored_array} getVideos={this.getVideos} />)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


//window.YOUTUBE_API_KEY = 'AIzaSyC4SWubXKHq46UfqeklCABDjmIJwdFLtnA';
//https://www.googleapis.com/youtube/v3/search