import React, { Component } from "react";
import { Table } from "reactstrap";
class ListView extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{this.props.books}</tbody>
      </Table>
    );
  }
}

export default ListView; // Don’t forget to use export default!
