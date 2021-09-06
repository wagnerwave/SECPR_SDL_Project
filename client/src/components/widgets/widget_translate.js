import React from "react";
import FormTranslate from "./form_translate";


class WidgetTranslate extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        error: null,
        text: null
      };
    }
        
    getText = async (e) => {
    const to_translate = e.target.elements.text.value;
    const language = e.target.elements.language.value;
    e.preventDefault()
    const api_call = await fetch(`https://language-translation.p.rapidapi.com/translateLanguage/translate?type=html&target=${language}&text=${to_translate}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "99808c3c79msh1353cea85198402p1d3c29jsned3d78b247bc",
            "x-rapidapi-host": "language-translation.p.rapidapi.com"
        }
    });

    const result = await api_call.json();
    console.log(result);
    if(to_translate){
        this.setState({
        text: result.translatedText,
        error: ""
        })
    }else{
        this.setState({
        error: "Please choose search values..."
        })
    }
    }

    render() {

    return (
        <div>
            <center>
            <FormTranslate loadText={this.getText} />
            <p>{this.state.text}</p>
            </center>
        </div>
    )
    }
}
export default WidgetTranslate;