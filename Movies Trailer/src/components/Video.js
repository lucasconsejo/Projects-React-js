import React from 'react'

const YOUTUBE_URL = 'https://www.youtube.com/embed/'

const Video = ({currentVideo}) =>{
    return (
        <div className='video embed-responsive embed-responsive-16by9'>
            <iframe className='embed-responsive-item' src={`${YOUTUBE_URL}${currentVideo.videoId}?autoplay=1&rel=0`} title={currentVideo.title} allow="autoplay" allowFullScreen />
        </div>
    )
}

export default Video