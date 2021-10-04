import React from "react";
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";


const Admin = () => {

    const SecretToken = "YXJtYW5kb2JvbmQ=";
    const history = useHistory();
    const cookies = new Cookies();

    const clearCookies = async e => { cookies.set("jwt", '') };
    try {
        let accessToken = cookies.get('jwt');
        if (!accessToken)
            history.push("/403");
        let data = jwt.verify(accessToken, SecretToken, 
            (err) => {
            if (err) history.push("/403");
        });
        console.log("INFO:", data);
    } catch(e) {
        console.error(e);
    }

    return (
        <div>
            <div class="topnav" id="myTopnav">
                <a href="/login" id="logout-button" class="active" clearCookies={e => clearCookies(e)}>Logout</a>
            </div>
            <div>
                <h1>Hello admin</h1>
            </div>
        </div>
    );
}

export default Admin;