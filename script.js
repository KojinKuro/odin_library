const myLibrary = [];

class Book {
  constructor(name) {
    this.name = name;
  }
}

function addBookToLibrary(name) {
  myLibrary.push(new Book(name));
}

function displayBooks() {
  
}