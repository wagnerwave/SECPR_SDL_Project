import React from "react";
import FormSearchGithub  from "./form_search_github";

class WidgetGithub extends React.Component {
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
          const api_call = await fetch(`https://api.github.com/users/${to_search}/followers`, {"method": 'GET'});
  
          const result = await api_call.json();
          console.log(result);
          if(to_search){
              this.setState({
              results: result,
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
              <FormSearchGithub runSearch={this.getResearch} />
              {this.state.results.map(item => (
                  <li>
                      <img width="50" length="50" src={item.avatar_url}></img>
                      <a href={item.html_url}><p> {item.login}</p></a>
                  </li>
              ))}
              </center>
          </div>
      )
      }
}
export default WidgetGithub;