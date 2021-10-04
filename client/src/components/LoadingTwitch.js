import React from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";

const LoadingTwitch = () => {
    const SecretToken = "YXJtYW5kb2JvbmQ=";
    const history = useHistory();
    const cookie = new Cookies();

    async function twitchConnexion() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
    
        const requestToken = urlParams.get('code');
        
        if (requestToken) {
            console.log(requestToken);
            try {
                const access_token = await axios.get(`http://localhost:3000/twitch-sign-in?token=${requestToken}`);
                const client_id = "f6sq52jw9i9242rxfereg353dxbed0";            
                const OauthToken = access_token.data;

                console.log(OauthToken);

                const UserData = await axios({
                    method: 'get',
                    url: 'https://api.twitch.tv/helix/users',
                     headers: {
                         Authorization: 'Bearer ' + OauthToken,
                         "Client-Id": client_id  
                     }
                });
                console.log(UserData);
                if (UserData.data.login !== "") {
                    let accessToken = jwt.sign({"username": UserData.data.login}, SecretToken, {algorithm: "HS256", expiresIn: 120});
                    cookie.set('jwt', accessToken, { path: '/' });
                    history.push(`/dashboard?TwitchToken=${UserData.data.access_token}`);
                } else {
                    alert("Error: twitch sign in get an error");
                    history.push('/login');                    
                } 
            } catch(err) {
                console.log(err)
            }
        }  
    }
    twitchConnexion();

    return (
        <div>
            <center>
                <h1>Loading ...</h1>
                <p>You will be redirected...</p>
            </center>
        </div>
    );
};

export default LoadingTwitch;