import React from "react";
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";

// import widget
import WidgetWeather from './widgets/widget_weather'
import WidgetConverter from './widgets/widget_converter'
import WidgetTranslate from './widgets/widget_translate'
import WidgetNews from './widgets/widget_news'
import WidgetSearch from './widgets/widget_search'
import WidgetGithub from "./widgets/widget_github";

const Dashboard = () => {
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
        <div>
            <div class="topnav" id="myTopnav">
                <button id="Add-Weather" onClick={() => document.getElementById("weather").style.display = "block" }>Add Weather</button>
                <button id="Add-Converter" onClick={() => document.getElementById("converter").style.display = "block" }>Add Converter</button>
                <button id="Add-News" onClick={() => document.getElementById("news").style.display = "block" }>Add News</button>
                <button id="Add-Translate" onClick={() => document.getElementById("translate").style.display = "block" }>Add Translate</button>
                <button id="Add-Search" onClick={() => document.getElementById("search").style.display = "block" }>Add Search</button>
                <button id="Add-Search-github" onClick={() => document.getElementById("github").style.display = "block" }>Add Search Github</button>
                <button id="Hide-Weather" onClick={() => document.getElementById("weather").style.display = "none" }>Hide Weather</button>
                <button id="Hide-Converter" onClick={() => document.getElementById("converter").style.display = "none" }>Hide Converter</button>
                <button id="Hide-News" onClick={() => document.getElementById("news").style.display = "none" }>Hide News</button>
                <button id="Hide-Translate" onClick={() => document.getElementById("translate").style.display = "none" }>Hide Translate</button>
                <button id="Hide-Search" onClick={() => document.getElementById("search").style.display = "none" }>Hide Search</button>
                <button id="Hide-Search-github" onClick={() => document.getElementById("github").style.display = "none" }>Hide Search Github</button>
                <a href="/login" id="logout-button" class="active" clearCookies={e => clearCookies(e)}>Logout</a>
            </div>
            <div class="widget-box">
                <div class="card" id="weather">
                    <WidgetWeather />
                </div>
                <div class="card" id="converter">
                    <WidgetConverter />
                </div>
                <div class="card" id="news">
                    <WidgetNews />
                </div>
                <div class="card" id="translate">
                    <WidgetTranslate />
                </div>
                <div class="card" id="search">
                    <WidgetSearch />
                </div>
                <div class="card" id="github">
                    <WidgetGithub />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;