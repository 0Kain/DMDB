import React, { Component } from "react";
import ReactDOM from "react-dom";
import dbTest from "../../db_connect/db_connect.js"
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import { MuiThemeProvider } from "material-ui/styles";
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class DbDisplayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      listFilms: [],
      styles: {
        gridList: {
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          width: '300%'
        },
        titleStyle: {
          color: 'rgb(0, 188, 212)',
        },
      }
    }
  }

  displayDB = async () => {
    //alert('begin');
    this.setState({
      listFilms: await dbTest()
    })

    this.state.listFilms.forEach(film => {
      let link = film.Poster;
      let plot = film.Plot;
      let title = film.Title;
      let rating = film.Rating;
      let genre = film.Genre;

      this.state.cards.push(
        <Card key={title}>
          <CardHeader
            title={title}
            subtitle={genre}
          />
          <CardMedia>
            <img src={link} />
          </CardMedia>
          <CardTitle title={'Rating: '+rating}/>
          <CardText>
            {"Synopsis:\n"+plot}
          </CardText>
        </Card>
      );
    });
    this.forceUpdate()
  }

  render() {//TODO une gridlist par genre
    return (
      <MuiThemeProvider>
        <GridList cellHeight="auto" style={this.state.styles.gridList} cols={1}>
          {this.state.cards}
        </GridList>
      </MuiThemeProvider>
    );
  }

  componentDidMount(){
    this.displayDB()
  }
}

const wrapper = document.getElementById("db-connect");
wrapper ? ReactDOM.render(<DbDisplayer />, wrapper) : false;

export default DbDisplayer;