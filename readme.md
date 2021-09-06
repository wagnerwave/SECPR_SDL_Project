# Dashboard
## Sujet
<p>Réalisation d'une application web, qui contient différents widgets, qui fournissent chacun des informations différentes. De plus
il fallit mettre en place un sytème d'authentification sur notre application, ainsi que la possibilité de se connecté via des 
services externes.</p></br>

## Notre projet
### Choix des technos
<p>Il y a <b>3 parties</b> distinctes dans le projet, il y a la partie front que nous avons réalisé en <b>ReactJS</b>, la partie back 
réalisé avec <b>NodeJS</b> et enfin, la base de données, où nous avons utilisé <b>MongoDB</b>.</p></br>

### Les widgets
<p> Chaque widget est indépendant, et utilise sa propre API pour fonctionner.</p>
* <b>OpenWeatherMap API</b>, via cette API on a pu créer un <b>widget météo</b> qui nous donnes des informations météorologiques pour un endroit donné. L'utilisateur a juste à rentré une ville (ainsi que le pays de cette ville) pour que des informations soient affichés.</br></br>
* <b>ExchangeRatesAPI</b>, là nous avons mis en place un <b>widget convertisseur de monnaie</b>, nous avons accès à différentes monnaies utilisés dans le monde, en rentrant un nombre celui-ci est convertie dans sa valeur dans l'autre monnaie sélectionnée.</br></br>
* <b>NewAPI</b>, pour le 3ème widget nous avons décidé de mettre en place un <b>widget news</b>. Le widget nous permet de choisir entre la France, les Etats-Unis, la Grande-Bretagne et la Russie. Il nous fournit ensuite un petit résumé de différentes actualités dans ce pays ainsi qu'un lien vers les articles pour en savoir plus.</br></br>
* <b>Language Translation API</b>, il nous arrive souvent d'avoir besoin de traduire certains où certaines phrase. C'est pourquoi nous avons un <b>widget de traduction</b>, il détecte la langue utilisé dans le texte entré et nous pouvons ensuite le traduire soit en français, russe, anglais ou espagnol.</br></br>
* <b>Google Search API</b>, quoi de mieux qu'un <b>widget de recherche</b>, qui nous permet d'avoir accès au moteur de recherche Google et ainsi faire nos recherches directement sur le dashboard. Entrer ce que vous voulez et vous aurez votre réponse ainsi que la possibilité d'être redirigé sur un des sites qui vous intéresse.</br></br>
* <b>Github API</b>, si vous voulez savoir les followers d'une personne, il ya ce <b>widget de recherche de compte</b>, qui nous permet de savoir quelles personnes suive un compte Github.</br></br>

### Les services
<p> Il a fallu mettre en place, un système d'authentifiation via des services externes, nous en avons trois différents.</p>
* <b>Google</b>, possibilité de se connecter à son Google.</br></br>
* <b>Github</b>, possibilité de se connecter à son Github.</br></br>
* <b>Twitch</b>, possibilité de se connecter à son Twitch.</br></br>
