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
class ModalAdd extends Component {
  state = {
    newBookData: {
      title: "",
      rating: ""
    },
    editBookData: {
      id: "",
      title: "",
      rating: ""
    },
    newBookModal: false,
    editBookModal: false
  };
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
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggleNewBookModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
          Add a new book
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              value={this.state.newBookData.title}
              onChange={e => {
                let { newBookData } = this.state;

                newBookData.title = e.target.value;

                this.setState({ newBookData });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input
              id="rating"
              value={this.state.newBookData.rating}
              onChange={e => {
                let { newBookData } = this.state;

                newBookData.rating = e.target.value;

                this.setState({ newBookData });
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.props.anAddBook()}>
            Add Book
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => this.props.toggleNewBookModal()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalAdd; // Don’t forget to use export default!
