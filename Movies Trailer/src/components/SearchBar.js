import React, { Component } from 'react'
import logo from "../img/search.png"

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            placeholder: 'Rechercher une bande annonce',
            intervalBeforeRequest:2000,
            lockRequest: false
        }
    }
    pressEnter(event){
        if(event.key === 'Enter') {
            this.search()
        }
    }

    getText(event){
        this.setState({
            searchText: event.target.value
        })
        /*if(!this.state.lockRequest){
            this.setState({
                lockRequest: true
            })
            setTimeout(this.search.bind(this), this.state.intervalBeforeRequest)
        }*/
    }

    searchClick(event){
        this.search()
    }

    search(event){
        this.props.callback(this.state.searchText)
        this.setState({
            searchText: ""
        })
        /*this.setState({
            lockRequest: false
        })*/
    }

    render(){
        return (
            <div className='row'>
                <div className='col-md-8 input-group'>
                    <input type='text' className='form-control input-lg' placeholder={this.state.placeholder} onChange={this.getText.bind(this)} onKeyPress={this.pressEnter.bind(this)}/>
                    <span className='input-group-btn'>
                        <button className='btn btn-secondary' onClick={this.searchClick.bind(this)}>
                        <img src={logo} alt="logo search"></img></button>
                    </span>
                </div>
            </div>
        )
    }
}

export default SearchBar