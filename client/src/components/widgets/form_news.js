import React from "react";
// FOR WEATHER
class FormNews extends React.Component{

    render(){

        return(
            <form onSubmit = {this.props.loadNews}>
                <p>Choose a country to know the news :</p>
                <select name="country" id="country-select">
                    <option value="fr">France</option>
                    <option value="us">Etats-Unis</option>
                    <option value="ru">Russie</option>
                    <option value="gb">Grande-Bretagne</option>
                </select>
                <button>Get News</button>
            </form>
           
        )
    }
}

export default FormNews;