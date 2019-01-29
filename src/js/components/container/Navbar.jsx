import React, { Component } from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Navbar extends Component {
    constructor() {
        super();
    }
    render() {

        return (
            <MuiThemeProvider>
                <Drawer variant="permanent">
                    <div>
                        <Divider />
                        <List>
                        {['Comedy', 'Fantasy', 'Drama', 'Action','Adventure','Sci-Fi','Thriller'].map((text, index) => (
                            <ListItem button key={text}>
                            <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        </List>
                        <Divider />
                    </div>
                </Drawer>
            </MuiThemeProvider>);
    }
    componentDidMount(){
    }
}
const wrapper = document.getElementById("navbar");
wrapper ? ReactDOM.render(<Navbar />, wrapper) : false;

export default Navbar;