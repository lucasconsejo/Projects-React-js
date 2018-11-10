import React, { Component } from 'react'
import logo from "../img/logo.svg"
import SearchBar from "../components/SearchBar"

class Header extends Component{
    //callback={this.textSearch.bind(this)}
    render(){
        return(
            <div id="nav">
               <nav className="row">
                    <div className="col-md-3 col-sm-3">
                        <a className="navbar-brand" href="/recommandations">
                            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                            WeTube
                        </a>
                    </div>

                    <div className="col-md-9 col-sm-9">
                        <SearchBar callback={this.textSearch.bind(this)}/>    
                    </div>                
                </nav>
            </div>
        )
    }

    textSearch(text){
        this.props.callback(text)
    }
}

export default Header