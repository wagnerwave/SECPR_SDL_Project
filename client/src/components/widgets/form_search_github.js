import React from "react";

class FormSearchGithub extends React.Component{

    render(){

        return(
            <form onSubmit = {this.props.runSearch}>
                <input id="github-search" type="text" name="text"/>
                <button id="github-submit" >Search</button>
            </form>
           
        )
    }
}

export default FormSearchGithub;