import React, { Component } from 'react';
import Cookies from 'universal-cookie';


export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    clearCookies () { 
        const cookies = new Cookies();
        cookies.remove("jwt");
    };

    render() {
        return(
            <div>
                <div className="topnav" id="myTopnav">
                <a href="/login" id="logout-button" className="active" onClick={this.clearCookies} >Logout</a>
                </div>
            </div>
        )
    }
}