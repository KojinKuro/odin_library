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

function addBook(name, author, pages, read) {
  myLibrary.push(new Book(name, author, pages, read));
  saveLibrary();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
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

  myLibrary.forEach((book, index) => {
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
    // progress bar
    // read button
    // remove button
    const bookRemove = document.createElement("button");
    bookRemove.setAttribute("value", index);
    bookRemove.innerText = "Remove";
        // check this man
    bookRemove.addEventListener("click", function() {
      removeBook(this.value);
    });
    bookCard.appendChild(bookRemove);
    // stick to the container
    booksNode.appendChild(bookCard);
  });
}

function addFluffBooks() {
  addBook("The Enigmatic Elixir", "Penelope Puzzleton", 352, false);
  addBook(
    "Secrets of the Starry Night",
    "Maxwell Moonshadow",
    420,
    true
  );
  addBook("Whispers in the Wind", "Cassandra Mystique", 288, false);
  addBook(
    "The Curious Case of Mr. Quill",
    "Oliver Featherstone",
    304,
    true
  );
  addBook("Lost in the Labyrinth", "Amelia Riddlewood", 416, false);
  addBook(
    "The Mysterious Memoirs of Professor Peculiar",
    "Edgar Enigma",
    368,
    true
  );
  addBook(
    "Chronicles of the Cosmic Conundrum",
    "Celeste Stardust",
    512,
    false
  );
  addBook("The Puzzling Paradox", "Quentin Quizzleton", 276, true);
  addBook(
    "The Haunting of Hawthorn Manor",
    "Victoria Vanishing",
    344,
    false
  );
  addBook("The Cryptic Cipher", "Harrison Riddlestone", 400, true);
}

//code for the menu
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const submitButton = document.querySelector(`dialog button[type="submit"]`);
const closeButton = document.querySelector("dialog > button#close");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
  const form = document.getElementById("book-form");
  const formData = new FormData(form);
  form.reset();

  addBook(
    formData.get("book-name"),
    formData.get("book-author"),
    formData.get("book-pages"),
    formData.get("book-read")
  );

  dialog.close();
  event.preventDefault();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

loadLibrary();
displayBooks();
