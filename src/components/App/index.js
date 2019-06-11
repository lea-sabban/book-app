import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import axios from "axios";
import { navigate } from "@reach/router";
import { dynamicSort } from "./../../services/helper";
import ListView from "./../ListView";
import ModalAdd from "./../ModalAdd";
import GridView from "./../GridView";
import DetailView from "./../Detail";

import "./../../css/index.css";

class App extends Component {
  state = {
    isGridView: true,
    books: [],
    currentBook: {},
    newBookData: {
      title: "",
      description: ""
    },
    viewDetail: false,
    editBookData: {
      id: "",
      title: "",
      description: ""
    }
  };

  componentWillMount() {
    this.refreshBooks();
  }

  detailBook(book) {
    navigate(`/detail/${book.id}`);
    this.setState({
      viewDetail: true,
      currentBook: book
    });
  }

  toggleView(bool) {
    this.setState({
      isGridView: bool
    });
  }

  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    });
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal
    });
  }

  // ################################### API FUNCTIONS
  editBook(e, book) {
    e.stopPropagation();
    const { id, title, description } = book;
    this.setState({
      editBookData: { id, title, description },
      editBookModal: !this.state.editBookModal
    });
  }

  componentDidUpdate() {
    console.log(arguments);
  }

  deleteBook(e, book) {
    e.stopPropagation();
    const { id } = book;
    axios.delete("http://localhost:3000/books/" + id).then(response => {
      this.refreshBooks();
    });
  }

  refreshBooks() {
    axios.get("http://localhost:3000/books").then(response => {
      response.data.sort(dynamicSort("title"));
      this.setState({
        books: response.data
      });
    });
  }

  updateBook() {
    let { title, description } = this.state.editBookData;
    axios
      .put("http://localhost:3000/books/" + this.state.editBookData.id, {
        title,
        description
      })
      .then(response => {
        this.refreshBooks();

        this.setState({
          editBookModal: false,
          editBookData: { id: "", title: "", description: "" }
        });
      });
  }

  addBook() {
    axios
      .post("http://localhost:3000/books", this.state.newBookData)
      .then(response => {
        let { books } = this.state;

        books.push(response.data);
        books.sort(dynamicSort("title"));
        this.setState({
          books,
          newBookModal: false,
          newBookData: {
            title: "",
            description: ""
          }
        });
      });
  }
  // ################################### END API FUNCTIONS
  render() {
    const classes = this.props.classes;
    return (
      <div className="App">
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography
              className={classes.typography}
              variant="h6"
              color="inherit"
              noWrap
            >
              Book Library
            </Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.toggleView(true)}
            >
              Grid View
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.toggleView(false)}
            >
              List View
            </Button>
          </Grid>
        </Grid>

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Book Library
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Test App to learn REACT and MATERIAL UI
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.toggleNewBookModal()}
                  >
                    Add Book
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {/* 
        <Router>
          <Home path="/home" />
        </Router> */}

        {this.state.viewDetail && <DetailView book={this.state.currentBook} />}

        {this.state.isGridView ? (
          <GridView
            path="gridview"
            data={this.state.books}
            onEdit={(e, book) => this.editBook(e, book)}
            onDelete={(e, book) => this.deleteBook(e, book)}
            onViewDetail={book => this.detailBook(book)}
          />
        ) : (
          <ListView
            path="listview"
            onViewDetail={(e, book) => this.detailBook(e, book)}
            onDelete={(e, book) => this.deleteBook(e, book)}
            onEdit={(e, book) => this.editBook(e, book)}
            books={this.state.books}
          />
        )}

        {(this.state.newBookModal || this.state.editBookModal) && (
          <ModalAdd
            newBookModal={this.state.newBookModal}
            editBookModal={this.state.editBookModal}
            editBookData={this.state.editBookData}
            newBookData={this.state.newBookData}
            onToggleNew={() => this.toggleNewBookModal()}
            onToggleEdit={() => this.toggleEditBookModal()}
            onAddBook={data => this.addBook(data)}
            onUpdateBook={data => this.updateBook(data)}
          />
        )}
      </div>
    );
  }
}

export default withStyles(theme => ({
  appBar: {
    width: "100%"
  },
  detailView: {
    width: "20%"
  },
  button: {
    margin: theme.spacing(1)
  }
}))(App);
