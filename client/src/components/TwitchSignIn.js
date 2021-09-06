import React from 'react';

const onFailure = response => console.error("Error:", response);

const TwitchSignIn = () => {
    
    return (
        <div class="twitch-btn">
            <a href="https://id.twitch.tv/oauth2/authorize?client_id=f6sq52jw9i9242rxfereg353dxbed0&redirect_uri=http://localhost:8080/loading_twitch&response_type=code&scope=user:read:email"
                onFailure={onFailure}
            >
            <button class="button-twitch" >Login with Twitch</button>
            </a>
        </div>
    );
};

export default TwitchSignIn;