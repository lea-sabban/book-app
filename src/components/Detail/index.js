import React, { Component } from "react";

class DetailView extends Component {
  render() {
    return <h1>This is our detail view{this.props.id}</h1>;
  }
}

export default DetailView;
