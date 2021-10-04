import React from "react";

class FormSearch extends React.Component{

    render(){

        return(
            <form onSubmit = {this.props.runSearch}>
                <input id="google-search" type="text" name="text"/>
                <button id="google-submit" >Search</button>
            </form>
           
        )
    }
}

export default FormSearch;