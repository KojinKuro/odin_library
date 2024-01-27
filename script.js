//code for the menu
const dialog = document.querySelector("dialog#dialog-add");
const dialogEdit = document.querySelector("dialog#dialog-edit");
const showButton = document.querySelector("button.book-add");
const submitButton = document.querySelector(`dialog#dialog-add button.submit`);
const submitEditButton = document.querySelector(
  `dialog#dialog-edit button.submit`
);
const closeButton = document.querySelector("dialog#dialog-add button.close");
const closeEditButton = document.querySelector(
  "dialog#dialog-edit button.close"
);

showButton.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
  const form = document.getElementById("book-form-add");
  const formData = new FormData(form);
  form.reset();

  addBook(
    formData.get("book-name"),
    formData.get("book-author"),
    formData.get("book-pages"),
    formData.get("book-status"),
    formData.get("book-rating")
  );

  dialog.close();
  event.preventDefault();
});

submitEditButton.addEventListener("click", (event) => {
  const form = document.getElementById("book-form-edit");
  const formData = new FormData(form);

  editBook(
    dialogEdit.dataset.index,
    new Book(
      formData.get("book-name"),
      formData.get("book-author"),
      formData.get("book-pages"),
      formData.get("book-status"),
      formData.get("book-rating")
    )
  );

  saveLibrary();
  displayBooks();

  dialogEdit.close();
  event.preventDefault();
});

closeButton.addEventListener("click", (event) => {
  dialog.close();
  event.preventDefault();
});

closeEditButton.addEventListener("click", (event) => {
  dialogEdit.close();
  event.preventDefault();
});

const myLibrary = [];

class Book {
  // author, title, number of pages, whether it’s been read
  constructor(name, author, pages, status, rating) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.rating = rating;
  }
}

function addBook(name, author, pages, status, rating) {
  myLibrary.push(new Book(name, author, pages, status, rating));
  saveLibrary();
  displayBooks();
}

function getBook(index) {
  return myLibrary.at(+index);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  saveLibrary();
  displayBooks();
}

function editBook(index, newBook) {
  myLibrary.splice(index, 0, newBook);
  myLibrary.splice(++index, 1);
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
  const booksNode = document.querySelector("#book-grid-content");
  while (booksNode.firstChild) {
    booksNode.removeChild(booksNode.lastChild);
  }

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-row");

    const bookMain = document.createElement("div");
    bookMain.setAttribute("class", "book-main");
    // add title
    const bookName = document.createElement("div");
    bookName.setAttribute("class", "book-name");
    const titleText = document.createTextNode(`${book.name} by ${book.author}`);
    bookName.appendChild(titleText);
    bookMain.appendChild(bookName);
    // settings
    const bookEdit = document.createElement("button");
    bookEdit.innerText = "Edit";
    bookEdit.addEventListener("click", function () {
      dialogEdit.setAttribute("data-index", index);
      dialogEdit.showModal();
    });
    bookMain.appendChild(bookEdit);
    const bookRemove = document.createElement("button");
    bookRemove.setAttribute("data-index", index);
    bookRemove.innerText = "x";
    bookRemove.addEventListener("click", function () {
      removeBook(this.dataset.index);
    });
    bookMain.appendChild(bookRemove);
    bookCard.appendChild(bookMain);

    // pages
    const bookPage = document.createElement("div");
    bookPage.setAttribute("class", "book-pages");
    bookPage.innerText = `${book.pages}pg`;
    bookCard.appendChild(bookPage);

    // status list
    const bookStatus = document.createElement("div");
    bookStatus.setAttribute("class", "book-status");
    const bookStatusText = document.createElement("div");
    bookStatusText.innerText = book.status;
    bookStatus.appendChild(bookStatusText);
    bookCard.appendChild(bookStatus);

    //ratings
    const bookRating = document.createElement("div");
    bookRating.setAttribute("class", "book-rating");
    bookRating.innerText = `${book.rating}`;
    bookCard.appendChild(bookRating);

    // stick to the container
    booksNode.appendChild(bookCard);
  });
}

function addFluffBooks() {
  addBook("The Enigmatic Elixir", "Penelope Puzzleton", 352, "false");
  addBook("Secrets of the Starry Night", "Maxwell Moonshadow", 420, "true");
  addBook("Whispers in the Wind", "Cassandra Mystique", 288, "false");
  addBook("The Curious Case of Mr. Quill", "Oliver Featherstone", 304, "true");
  addBook("Lost in the Labyrinth", "Amelia Riddlewood", 416, "false");
  addBook("The Mysterious Memoirs of Peculiar", "Edgar Enigma", 368, "true");
  addBook("The Cosmic Conundrum", "Celeste Stardust", 512, "false");
  addBook("The Puzzling Paradox", "Quentin Quizzleton", 276, "true");
  addBook("The Haunting of Hawthorn Manor", "Victoria Vanishing", 344, "false");
  addBook("The Cryptic Cipher", "Harrison Riddlestone", 400, "true");
}

loadLibrary();
displayBooks();
