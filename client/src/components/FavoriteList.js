import React, { Component } from 'react';
import Loading from './Loading';
import axios from 'axios';

class FavoriteList extends Component {
  constructor(){
    super()
    this.state = {
      deletedId: null
    }
  }

  componentDidMount() {
    // this.props.getVideos();
  }

  deleteVideo() {
    axios.delete(`/api/MVP/${this.props.video.id}`)
    .then(() => {
      console.log('Successfully delete a task')
      this.props.getVideos();
      this.setState({deletedId: true})
    })
    .catch(err=> {
      console.log('Error occur when delete a task: ', err)
    })
  }
  
  render() {
    console.log('props:', this.props)
    return (
      <div className="single-task">
        <div className="row">
          <div className="col-sm-11 task-section">  
            {!this.props.video ? <Loading /> : this.props.video.videoTitle}
          </div>
          <div className="col-sm-1 remove-section">
            <button className="btn remove-btn" onClick={() => this.deleteVideo()}>x</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteList;