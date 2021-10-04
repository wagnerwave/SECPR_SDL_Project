import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";

import Loader from '../components/Loader';
import Tetris from '../components/Tetris'
import '../styles/Game.css'

const Game = () => {
    const [loader, setLoader] = React.useState(false);
    useEffect(() => {
        setLoader(false);
        document.title = "Play Game | Tetromino"
        setInterval(() => {
            setLoader(true);
        }, 2000);
    }, []);

    const SecretToken = "YXJtYW5kb2JvbmQ=";
    const history = useHistory();
    const cookies = new Cookies();

    const clearCookies = async e => { cookies.set("jwt", '') };
    try {
        let accessToken = cookies.get('jwt');
        if (!accessToken)
            history.push("/403");
        jwt.verify(accessToken, SecretToken, (err) => {
            if (err) history.push("/403");
        });
    } catch(e) {
        console.error(e);
    }

    return (
        <div class="topnav" id="myTopnav">
            <a href="/login" id="logout-button" class="active" clearCookies={e => clearCookies(e)}>Logout</a>
            {loader ? (<Tetris />) : (<Loader />)}
        </div>
    )
}

export default Game;
