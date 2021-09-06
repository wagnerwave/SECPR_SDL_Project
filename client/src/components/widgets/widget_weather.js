// FOR WEATHER 
// put this code in App.js and it works

import React from "react";
import Weather from "./weather";
import FormWeather from "./form_w";

const Api_Key = "5e0e6349f86803f3c12aa1d0820db547";

class WidgetWeather extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }

  intervalID;

  // componentDidMount() {
  //   this.getWeather();
  // }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearInterval(this.intervalID);
  }

  //getWeather is a method we'll use to make the api call
  getWeather = async (e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();   
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();
    console.log(response);
    
    if(city && country){
      this.setState({
        temperature: Math.round((response.main.temp - 273.15) * 100) / 100,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }
    // this.intervalID = setTimeout(this.getWeather.bind(this), 5000);
  }

  render() {

    return (

      <div>
        <center>
        <FormWeather loadWeather={this.getWeather} />
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
          </center>
      </div>

    )
  }
}
export default WidgetWeather;