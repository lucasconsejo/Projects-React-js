import React from 'react'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const VideoListItem = (props) => {
    const movies = props.movies
    const img = IMAGE_URL+""+movies.poster_path
    return(
        <li className='list-group-item' key={movies} onClick={changeVideo}>
            <div className='media'>
                <div className='media-left'>
                    <img className='media-object img-round' height="100px" src={img} alt={movies.title}/>
                </div>

                <div className='media-body'>
                    <h5 className='align-item'>{movies.title}</h5>
                </div>
            </div>
        </li>
        )
        
        function changeVideo() {
            props.changeVideo(movies)
        }
}

export default VideoListItem