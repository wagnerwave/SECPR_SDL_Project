import React from "react";
import { useHistory } from 'react-router-dom';

const ForbidenAccess = () => {
    const history = useHistory();

    setTimeout(5000); 
    history.push("/login");

    return (
        <div>
            <center>
                <h1>403 Forbiden access.</h1>
                <p>You will be redirected...</p>
            </center>
        </div>
    );
};

export default ForbidenAccess;