import React, { Component } from "react";
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

class ModalAdd extends Component {
  render() {
    return (
      // =========== START ADD MODAL================================
      <main>
        <Modal isOpen={this.props.newBookModal} toggle={this.props.onToggleNew}>
          <ModalHeader toggle={this.props.onToggleNew}>
            Add a new book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.props.newBookData.title}
                onChange={e => {
                  let { newBookData } = this.props;

                  newBookData.title = e.target.value;

                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                id="description"
                value={this.props.newBookData.description}
                onChange={e => {
                  let { newBookData } = this.props;

                  newBookData.description = e.target.value;
                  // Only for testing purpose adding a fake image when creating a book
                  newBookData.imageThumb =
                    "https://images.unsplash.com/photo-1559267911-4b1d7c9b0f04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=300&h=170&fit=crop&ixid=eyJhcHBfaWQiOjF9";

                  newBookData.imageBig =
                    "https://images.unsplash.com/photo-1559267911-4b1d7c9b0f04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9";

                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.props.onAddBook(this.props.newBookData)}
            >
              Add Book
            </Button>{" "}
            <Button color="secondary" onClick={this.props.onToggleNew}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* // ===========END ADD MODAL================================ //
        // ===========START EDIT MODAL=============================*/}
        <Modal
          isOpen={this.props.editBookModal}
          toggle={this.props.onToggleEdit}
        >
          <ModalHeader toggle={this.props.onToggleEdit}>
            Edit a new book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.props.editBookData.title}
                onChange={e => {
                  let { editBookData } = this.props;

                  editBookData.title = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                id="description"
                value={this.props.editBookData.description}
                onChange={e => {
                  let { editBookData } = this.props;
                  editBookData.description = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.props.onUpdateBook(this.props.editBookData)}
            >
              Update Book
            </Button>{" "}
            <Button color="secondary" onClick={this.props.onToggleEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </main>

      // ===========END EDIT MODAL================================
    );
  }
}

export default ModalAdd; // Don’t forget to use export default!
