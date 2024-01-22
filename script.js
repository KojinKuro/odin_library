const myLibrary = [];

class Book {
  // author, title, number of pages, whether it’s been read
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
  }
}

function addBookToLibrary(name, author, pages, read) {
  myLibrary.push(new Book(name, author, pages, read));
  saveLibrary();
  displayBooks();
}

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadLibrary() {
  let libraryVal = JSON.parse(localStorage.getItem("library"));
  if (!libraryVal) return;

  libraryVal.forEach((book) => {
    myLibrary.push(book);
  });
}

function displayBooks() {
  const booksNode = document.querySelector("#books-container");
  while (booksNode.firstChild) {
    booksNode.removeChild(booksNode.lastChild);
  }

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");
    // add title
    const bookName = document.createElement("div");
    bookName.setAttribute("class", "book-name");
    const titleText = document.createTextNode(`${book.name} by ${book.author}`);
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

function addFluffBooks() {
  addBookToLibrary("The Enigmatic Elixir", "Penelope Puzzleton", 352, false);
  addBookToLibrary(
    "Secrets of the Starry Night",
    "Maxwell Moonshadow",
    420,
    true
  );
  addBookToLibrary("Whispers in the Wind", "Cassandra Mystique", 288, false);
  addBookToLibrary(
    "The Curious Case of Mr. Quill",
    "Oliver Featherstone",
    304,
    true
  );
  addBookToLibrary("Lost in the Labyrinth", "Amelia Riddlewood", 416, false);
  addBookToLibrary(
    "The Mysterious Memoirs of Professor Peculiar",
    "Edgar Enigma",
    368,
    true
  );
  addBookToLibrary(
    "Chronicles of the Cosmic Conundrum",
    "Celeste Stardust",
    512,
    false
  );
  addBookToLibrary("The Puzzling Paradox", "Quentin Quizzleton", 276, true);
  addBookToLibrary(
    "The Haunting of Hawthorn Manor",
    "Victoria Vanishing",
    344,
    false
  );
  addBookToLibrary("The Cryptic Cipher", "Harrison Riddlestone", 400, true);
}


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

loadLibrary();
displayBooks();
