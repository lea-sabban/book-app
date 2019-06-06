import React, { Component } from "react";
import { addBook } from "./../../services/books";
import AppBar from "@material-ui/core/AppBar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GridView from "./../GridView";
import axios from "axios";
import ListView from "./../ListView";
import ModalAdd from "./../ModalAdd";
import "./../../css/index.css";
import { navigate } from "@reach/router";

import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import DetailView from "./../Detail";

let Home = () => (
  <div>
    <nav>
      <Link to="/gridview">Grid View</Link> |{" "}
      <Link to="/listview">List View</Link>
    </nav>
  </div>
);

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  appBar: {
    width: "100%"
  }
}));

class App extends Component {
  state = {
    books: [],
    currentBook: {},
    newBookData: {
      title: "",
      rating: ""
    },
    viewDetail: false,
    editBookData: {
      id: "",
      title: "",
      rating: ""
    }
  };

  componentWillMount() {
    this.refreshBooks();
  }

  detailBook(book) {
    console.log(book.id);
    navigate(`/detail/${book.id}`);
    this.setState({
      viewDetail: !this.state.viewDetail,
      currentBook: book
    });
  }

  toggleEditBookModal() {
    console.log("toggleEditBookModal");
    this.setState({
      editBookModal: !this.state.editBookModal
    });
  }
  toggleNewBookModal() {
    console.log("toggleNewBookModal");
    this.setState({
      newBookModal: !this.state.newBookModal
    });
  }

  updateBook() {
    let { title, rating } = this.state.editBookData;

    axios
      .put("http://localhost:3000/books/" + this.state.editBookData.id, {
        title,
        rating
      })
      .then(response => {
        this.refreshBooks();

        this.setState({
          editBookModal: false,
          editBookData: { id: "", title: "", rating: "" }
        });
      });
  }
  editBook(book) {
    const { id, title, rating } = book;
    this.setState({
      editBookData: { id, title, rating },
      editBookModal: !this.state.editBookModal
    });
  }
  deleteBook(book) {
    console.log("delete books", book);
    const { id } = book;
    axios.delete("http://localhost:3000/books/" + id).then(response => {
      this.refreshBooks();
    });
  }

  refreshBooks() {
    axios.get("http://localhost:3000/books").then(response => {
      this.setState({
        books: response.data
      });
    });
  }

  handleClick = e => {
    addBook(this.state.newBookData).then(newBookData => {
      let { books } = this.state;
      books.push(newBookData);

      this.setState({
        books,
        newBookModal: false,
        newBookData: {
          title: "",
          rating: ""
        }
      });
    });
  };

  render() {
    const classes = useStyles();

    let books = this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editBook.bind(
                this,
                book.id,
                book.title,
                book.rating
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => this.deleteBook(book)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    console.log(this.state.books);
    return (
      <div className="App container">
        <h1>Books App</h1>
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
        </AppBar>
        ;{this.state.viewDetail && <DetailView book={this.state.currentBook} />}
        <GridView
          path="gridview"
          data={this.state.books}
          onEdit={book => this.editBook(book)}
          onDelete={book => this.deleteBook(book)}
          onViewDetail={book => this.detailBook(book)}
        />
        <Button
          className="my-3"
          color="primary"
          onClick={() => this.handleClick()}
        >
          Add Book
        </Button>
        <Router>
          <Home path="/" />
          <ListView path="listview" books={books} />
        </Router>
        {this.state.newBookModal && (
          <ModalAdd
            isOpen={this.state.newBookData}
            onCloseClick={() => this.toggleNewBookModal()}
            onAddBook={() => this.addBook()}
          />
        )}
      </div>
    );
  }
}

export default App;
