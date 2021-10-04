import React from "react";
// FOR WEATHER
class FormWeather extends React.Component{

    render(){

        return(
            <form onSubmit = {this.props.loadWeather}>
                <input type="text" name="city" id="city-weather" placeholder="City..."/>
                <input type="text" name="country" id="country-weather" placeholder="Country..."/>
                <button id="submit-weather">Get Weather</button>
            </form>
           
        )
    }
}

export default FormWeather;