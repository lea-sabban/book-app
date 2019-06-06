import React, { Component } from "react";
import { addBook } from "./../../services/books";
import GridView from "./../GridView";
import axios from "axios";
import ListView from "./../ListView";
import ModalAdd from "./../ModalAdd";
import "./../../css/index.css";
import { navigate } from "@reach/router";
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button
} from "reactstrap";

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
  addBook() {
    axios
      .post("http://localhost:3000/books", this.state.newBookData)
      .then(response => {
        let { books } = this.state;

        books.push(response.data);

        this.setState({
          books,
          newBookModal: false,
          newBookData: {
            title: "",
            rating: ""
          }
        });
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

  render() {
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

        {this.state.viewDetail && <DetailView book={this.state.currentBook} />}
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
          onClick={() => this.toggleNewBookModal()}
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
