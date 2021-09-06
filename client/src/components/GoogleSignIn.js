import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";
import GoogleLogin from 'react-google-login';
import React  from 'react';
import axios from 'axios';

const onFailure = response => console.error("Error:", response);

const GoogleSignIn = () => {
    const SecretToken = "YXJtYW5kb2JvbmQ=";
    const history = useHistory();
    const cookie = new Cookies();

    const onSuccess = async (res) => {
            console.log(res);
            const googlerep = {
                Name: res.profileObj.name,
                email: res.profileObj.email,
                token: res.googleId,
                Image: res.profileObj.imageUrl,
                ProviderId: 'Google'
            };
            const config = { headers: { 'Content-Type':'application/json' } };
            const body = JSON.stringify(googlerep);
            const back_res = await axios.post('http://localhost:3000/google-sign-in', body, config);            
                
            console.log(back_res.data);
            let accessToken = jwt.sign({"username": googlerep.name, "email": googlerep.email}, SecretToken, {algorithm: "HS256", expiresIn: 120});
            cookie.set('jwt', accessToken, { path: '/' });
            history.push(`/dashboard?GoogleToken=${googlerep.token}`);
    }
    return (
        <GoogleLogin 
            clientId="516700897688-jrcc2lugd6uhj7j8rckkb87duh42ok8a.apps.googleusercontent.com"
             buttonText="Login with Google"
             redirectUri="http://localhost:8080/dashboard" 
             onSuccess={onSuccess} 
             onFailure={onFailure}
        />
    );
};

export default GoogleSignIn;
