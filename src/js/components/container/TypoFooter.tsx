import React, { Component } from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';

class TypoFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let copyright = "Copyright Binks, 2019."
        console.log(copyright);
        return (
            <MuiThemeProvider>
                <Typography color="secondary" align="center">
                    {copyright}
                </Typography>
            </MuiThemeProvider>
          );
    }

    componentDidMount(){
    }
}

const wrapper = document.getElementById("typofooter");
wrapper ? ReactDOM.render(<TypoFooter />, wrapper) : false;

export default TypoFooter;