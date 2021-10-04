import React from "react";

class FormTranslate extends React.Component{

    render(){

        return(
            <form onSubmit = {this.props.loadText}>
                <p>Translate english to :</p>
                <select name="language" id="langue-select">
                    <option value="fr">French</option>
                    <option value="ru">Russian</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
                <input id="input-translate" type="text" name="text"/>
                <button id="submit-translate" >Get Translation</button>
            </form>
           
        )
    }
}

export default FormTranslate;