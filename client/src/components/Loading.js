import React from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";

const Loading = () => {
    const SecretToken = "YXJtYW5kb2JvbmQ=";
    const history = useHistory();
    const cookie = new Cookies();

    async function githubConnexion() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
    
        const requestToken = urlParams.get('code');
        if (requestToken) {
            console.log(requestToken);
            try {
                const access_token = await axios.get(`http://localhost:3000/github-sign-in?token=${requestToken}`);
            
                const OauthToken = access_token.data;

                const UserData = await axios({
                    method: 'get',
                    url: 'https://api.github.com/user',
                     headers: {
                         Authorization: 'token ' + OauthToken
                     }
                });
                if (UserData.data.login !== "") {
                    let accessToken = jwt.sign({"username": UserData.data.login}, SecretToken, {algorithm: "HS256", expiresIn: 120});
                    cookie.set('jwt', accessToken, { path: '/' });
                    history.push(`/dashboard?GithubToken=${OauthToken}`);
                } else {
                    alert("Error: github sign in get an error");
                    history.push('/login');                    
                } 
            } catch(err) {
                console.log(err)
            }
        }  
    }
    githubConnexion();

    return (
        <div>
            <center>
                <h1>Loading ...</h1>
                <p>You will be redirected...</p>
            </center>
        </div>
    );
};

export default Loading;