import React from "react";
import FormSearch from "./form_search";


class WidgetSearch extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        error: null,
        results: []
      };
    }
        
    getResearch = async (e) => {
        const to_search = e.target.elements.text.value;
        e.preventDefault()
        const api_call = await fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${to_search}&num=10`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "99808c3c79msh1353cea85198402p1d3c29jsned3d78b247bc",
                "x-rapidapi-host": "google-search3.p.rapidapi.com"
            }
        });

        const result = await api_call.json();
        console.log(result);
        if(to_search){
            this.setState({
            results: result.results,
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
            <FormSearch runSearch={this.getResearch} />
            {this.state.results.map(item => (
                <li>
                    {item.title}
                    <p> {item.description}</p>
                    <a href={item.link}>{item.link}</a>
                </li>
            ))}
            </center>
        </div>
    )
    }
}
export default WidgetSearch;