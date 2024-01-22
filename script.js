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
  const booksNode = document.querySelector('#books-container');
  myLibrary.forEach((book) => {
    console.log(book);
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");
    // add title
    const bookName = document.createElement("div");
    bookName.setAttribute("class", "book-name");
    const titleText = document.createTextNode(book.name);
    bookName.appendChild(titleText);
    bookCard.appendChild(bookName);
    //add image
    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", "./images/book.jpeg");
    bookImage.setAttribute("alt", "Some dynamic alt text");
    bookCard.appendChild(bookImage);
    // stick to the container
    booksNode.appendChild(bookCard);
  });
}