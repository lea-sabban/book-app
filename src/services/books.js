import React, { Component } from "react";
import axios from "axios";

class Book extends Component {
  detailBook(book) {
    console.log(book);
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
    const { id } = book;
    // axios.delete("http://localhost:3000/books/" + id).then(response => {
    //   this._refreshBooks();
    // });
  }
  refreshBooks() {
    axios.get("http://localhost:3000/books").then(response => {
      this.setState({
        books: response.data
      });
    });
  }
}

export default Book;
