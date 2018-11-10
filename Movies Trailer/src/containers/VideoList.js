import React from 'react'
import VideoListItem from '../components/VideoListItem'

const VideoList = (props) =>{
    const listMovies = props.listMovies
    return (
        <div>
            <ul>
                {
                    listMovies.map((movie) =>{
                        return <VideoListItem movies={movie} key={movie.id} changeVideo={otherVideo}/>   
                    })
                }

            </ul>
        </div>
        )
        function otherVideo(movies){
            props.changeVideo(movies)
        }
}

export default VideoList