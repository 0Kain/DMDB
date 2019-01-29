import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SearchBar extends Component {
    constructor(){
        super();

        this.state = {
            search: ''
        }
    }
    
    render() {
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <TextField
                        onChange={(obj,newVal) => this.setState({search: newVal})}
                        hintText="Tapez votre recherche ici ..."
                        floatingLabelText="Recherche de films"
                    /><br />
                    <p>{this.state.search}</p>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
  
    componentDidMount(){

    }
}

const wrapper = document.getElementById("search-bar");
wrapper ? ReactDOM.render(<SearchBar />, wrapper) : false;

export default SearchBar;
