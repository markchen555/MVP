import React, { Component } from 'react';
import FavoriteList from './FavoriteList'

class Favorite extends Component {
  constructor() {
    super()
  }

  render() {
    console.log('favoriate:', this.props)
    return (
      <div>
        {this.props.videos.map((video, i) => <FavoriteList video={video} key={i} getVideos={this.props.getVideos}/>).reverse()}
      </div>
    );
  }
}

export default Favorite;