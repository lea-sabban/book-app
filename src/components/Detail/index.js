import React, { Component } from "react";

class DetailView extends Component {
  render() {
    const { title, rating } = this.props.book;

    return <h1>This is the detail view for the book called {title}</h1>;
  }
}

export default DetailView;
