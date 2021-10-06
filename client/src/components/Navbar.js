import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Navbar extends Component {
    clearCookies = async e => { cookies.remove("jwt") };

    render() {
        return(
            <div>
                <div class="topnav" id="myTopnav">
                <a href="/login" id="logout-button" class="active" clearCookie={e => clearCookies(e)} >Logout</a>
                </div>
            </div>
        )
    }
}