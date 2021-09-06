import React from "react";
import FormNews from "./form_news";


class WidgetNews extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        error: null,
        isLoaded: false,
        articles: []
      };
    }
    
    //   intervalID;
    
      // componentDidMount() {
      // }
      
      // componentWillUnmount() {
      //   /*
      //     stop getData() from continuing to run even
      //     after unmounting this component
      //   */
      //   clearInterval(this.intervalID);
      // }
        
      getNews = async (e) => {
        const country = e.target.elements.country.value;
        e.preventDefault()
        const api_call = await fetch(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=08907a9fa5bc47bdb4aa350d3c4885d1`);
        const result = await api_call.json();
        console.log(result);
        if(country){
          this.setState({
            articles: result.articles,
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
            <FormNews loadNews={this.getNews} />
              <ul>
              {this.state.articles.map(item => (
                  <li key={item.title}>
                  {item.title}<br/>
                  {item.description}<br/>
                  <a href={item.url}>{item.url}</a>
                  </li>
              ))}
              </ul>
            </center>
          </div>
    
        )
      }
}
export default WidgetNews;