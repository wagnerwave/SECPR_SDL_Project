import React from 'react';

const onFailure = response => console.error("Error:", response);

const GithubSignIn = () => {

    return (
        <div class="github-btn">
            <a href="https://github.com/login/oauth/authorize?client_id=cc06a2093a0c8600eef6" onFailure={onFailure}> 
                <button class="button-github" >Login with Github</button>
            </a>
        </div>
    );
};

export default GithubSignIn;