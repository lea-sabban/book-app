import React, { Component } from "react";
import { Table } from "reactstrap";

import Button from "@material-ui/core/Button";
class ListView extends Component {
  render() {
    let books = this.props.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.description}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2 edit"
              onClick={e => this.props.onEdit(e, book)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={e => this.props.onViewDetail(e, book)}
            >
              Detail
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={e => this.props.onDelete(e, book)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{books}</tbody>
      </Table>
    );
  }
}

export default ListView; // Don’t forget to use export default!
