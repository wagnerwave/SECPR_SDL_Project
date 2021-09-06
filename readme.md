# Dashboard
## Topic
<p>Making a web application, which contains different widgets, which each provide different information. In addition
authentication system on our application, as well as the ability to connect via external services. 
external services.</p></br>

## Our project
### Choice of technologies
<p>There are <b>3 distinct parts</b> in the project, there is the front end that we made with <b>ReactJS</b>, the back end 
made with <b>NodeJS</b> and finally, the database, where we used <b>MongoDB</b>.</p></br>

### Widgets
<p>Each widget is independent, and uses its own API to work.</p>
* <b>OpenWeatherMap API</b>, via this API we were able to create a <b>weather widget</b> that gives us weather information for a given location. The user just has to enter a city (as well as the country of that city) for information to be displayed.</br></br>
* <b>ExchangeRatesAPI</b>, there we set up a <b>currency converter widget</b>, we have access to different currencies used in the world, by entering a number this one is converted into its value in the other selected currency.</br></br>
* <b>NewAPI</b>, for the 3rd widget we decided to implement a <b>news widget</b>. The widget allows us to choose between France, USA, UK and Russia. It then provides us with a small summary of different news in that country as well as a link to the articles to learn more.</br></br>
* <b>Language Translation API</b>, we often need to translate some where some sentences. That's why we have a <b>translation widget</b>, it detects the language used in the text entered and we can then translate it either into French, Russian, English or Spanish.</br></br>
* <b>Google Search API</b>, what better than a <b>search widget</b>, which allows us to have access to the Google search engine and thus do our searches directly on the dashboard. Enter what you want and you'll get your answer as well as the ability to be redirected to one of the sites that interest you.</br></br>
* <b>Github API</b>, if you want to know the followers of a person, there is this <b>account search widget</b>, which allows us to know which people follow a Github account.</br></br>

### Services
<p> It was necessary to set up an authentication system via external services, we have three different ones.</p>
* <b>Google</b>, possibility to connect to his Google.</br></br>
* <b>Github</b>, possibility to connect to his Github.</br></br>
* <b>Twitch</b>, possibility to connect to his Twitch.</br></br>
