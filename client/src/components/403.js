import React from "react";

const ForbidenAccess = () => {
    alert("ERROR : 403 ACCESS FORBIDEN");
    return (
        <div>
            <center>
                <h1>403 Forbiden access.</h1>
                <p>You will be redirected...</p>
                <hr></hr>
                <a href="/login">
                    <button type="button">Go back to Login</button>
                </a>
                <a href="/dashboard">
                    <button type="button">Go back to the dashboard</button>
                </a>
            </center>
        </div>
    );
};

export default ForbidenAccess;