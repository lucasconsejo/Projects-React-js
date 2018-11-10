import React, { Component } from "react"
import VideoList from "./VideoList"
import VideoDetail from "../components/VideoDetail"
import Video from "../components/Video"
import Header from "../components/Header"
import axios from "axios"
import "../css/App.css"

const API_END_POINT = 'https://api.themoviedb.org/3/'
const POPULAR_MOVIES_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&region=FR&append_to_response=images'
const SEARCH_URL = 'search/movie?language=fr&include_adult=false&region=FR&append_to_response=images'
const API_KEY = 'api_key=e2bc3dec801ad992781271f2e3309966'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            listMovies: {},
            currentMovie: {}

        }
    }

    componentWillMount(){
        this.initMovies()
    }

    initMovies(){
        axios.get(API_END_POINT+POPULAR_MOVIES_URL+'&'+API_KEY)
            .then((response) =>{
                this.setState({
                    listMovies: response.data.results.slice(1, 6),
                    currentMovie: response.data.results[0],
                }, function() {
                   this.currentVideo() 
                })
            })
    }

    currentVideo(){
        axios.get(API_END_POINT+'movie/'+this.state.currentMovie.id+'?'+API_KEY+'&append_to_response=videos&include_adult=false&region=fr&language=fr')
            .then((response) =>{
               const youtubeKey = response.data.videos.results[0].key
               let currentMovie2 = this.state.currentMovie
               currentMovie2.videoId = youtubeKey
               this.setState({
                   currentMovie: currentMovie2
               })
            })
            .catch((err) =>{
                console.log("code :",err)
            })
    }

    renderVideoList(){
        if(this.state.listMovies.length >= 5){
            return <VideoList listMovies={this.state.listMovies} changeVideo={this.changeVideo.bind(this)}/>
        }
    }

    changeVideo(movies){
        this.setState({ 
            currentMovie:movies
        }, function(){
            this.currentVideo()
            this.recommandationMovie()
        })
    }

    textSearch(text){
        if(text){            
            axios.get(API_END_POINT+SEARCH_URL+'&'+API_KEY+"&query="+text)
            .then((response) =>{
                if(response.data && response.data.results[0]){
                    if(response.data.results[0].id !== this.state.currentMovie.id){
                        this.setState({
                            currentMovie: response.data.results[0]
                        }, function(){
                            console.log(response.data.results[0])
                            this.currentVideo()
                            this.recommandationMovie()
                        })
                    }
                }
            })
        }
    }

    recommandationMovie(){
        axios.get(API_END_POINT+'movie/'+this.state.currentMovie.id+'/recommendations?'+API_KEY+'&language=fr')
            .then((response) =>{
                this.setState({
                    listMovies: response.data.results.slice(0, 5)
                })
            })
    }
    render(){
        return (
            <div>
                <div id="header">
                    <div className="container-fluid">
                        <div id="searchBar">
                            <Header callback={this.textSearch.bind(this)} />
                        </div>
                    </div>
                </div>
                
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-md-8'>
                            <Video currentVideo={this.state.currentMovie} />
                            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
                        </div>

                        <div className='col-md-4 col-sm-12'>
                            <h5>Recommandation</h5>
                            {this.renderVideoList()}
                        </div> 
                    </div>    
                </div>         
            </div>
        )
    }
}

export default App