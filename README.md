# BOOK APP

### Getting Started

Clone the repo, then run `npm i` to install dependencies.

Run `npm start` to launch the application, a new window should automatically open with the app once webpack is initialized.

Run `npm test` to run the app's various unit tests

### Tech/Libs Used

- React
- Material UI
- Axios
- React

### Dev/Build Tools Used

- webpack
- babel
- jest
- enzyme
- prettier

---

## Notes

### Folder Structure

```
src
  components - all UI component
  css - style sheet
  services - API call js file


### Decisions and Notes

* If I had more time I would have more all the API call function (addBook, updateBook etc) to a separate folder like
services/books.js
* For the book creation I am letting the user choose a title and description but I am generating a random image (ideally would have create an image upload component)
* I started the project using reactstrap - then I change to materialUI since it gives more options but did not get enough time to switch the model back to using material UI

```
