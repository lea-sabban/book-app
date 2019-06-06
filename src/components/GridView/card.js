import React, { Component } from "react";
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

class Card extends React.Component {
  constructor(props) {
    super(props);

    //this.onClickEdit = this.onClickEdit.bind(this);
    //this.onClickDelete = this.onClickDelete.bind(this);
    // Define inline styles
    this.styles = { backgroundColor: props.data.color || "#000" };
  }

  render() {
    const { title, author } = this.props.data;

    return (
      <div onClick={() => this.props.onViewDetail(this.props.data)}>
        <div className="card-body" style={this.styles}>
          <div className="icon-wrapper section">
            <span className="icon" />
          </div>
          <div className="text-wrapper section">
            <div className="title">
              <span>{title}</span>
            </div>
            <div className="details">
              <span>{author}</span>
            </div>
            <Button
              color="success"
              size="sm"
              className="edit mr-2"
              onClick={() => this.props.onEdit(this.props.data)}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => this.props.onDelete(this.props.data)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
