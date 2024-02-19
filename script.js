const domHandler = (function () {
  //code for the menu
  const dialog = document.querySelector("dialog#dialog-add");
  const dialogEdit = document.querySelector("dialog#dialog-edit");
  const showButton = document.querySelector("button.book-add");
  const submitButton = document.querySelector(
    `dialog#dialog-add button.submit`
  );
  const submitEditButton = document.querySelector(
    `dialog#dialog-edit button.submit`
  );
  const closeButton = document.querySelector("dialog#dialog-add button.close");
  const closeEditButton = document.querySelector(
    "dialog#dialog-edit button.close"
  );

  const booksNode = document.querySelector("#book-grid-content");

  showButton.addEventListener("click", () => dialog.showModal());

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

  function displayBooks() {
    booksNode.innerHTML = "";

    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.setAttribute("class", "book-row");
      bookCard.innerHTML = `
    <div class="book-main">
      <div class="book-name">${book.name} by ${book.author}</div>
      <button>Edit</button>
      <button data-index="${index}">x</button>
    </div>
    <div class="book-pages">${book.pages}pg</div>
    <div class="book-status"><div>${book.status}</div></div>
    <div class="book-rating">${book.rating}</div>`;

      const bookEdit = bookCard.querySelector("button");
      bookEdit.addEventListener("click", function () {
        dialogEdit.querySelector("#name").value = myLibrary.at(index).name;
        dialogEdit.querySelector("#author").value = myLibrary.at(index).author;
        dialogEdit.querySelector("#pages").value = myLibrary.at(index).pages;
        dialogEdit.querySelector("#status").value = myLibrary.at(index).status;
        dialogEdit.querySelector("#rating").value = myLibrary.at(index).rating;
        dialogEdit.setAttribute("data-index", index);
        dialogEdit.showModal();
      });

      const bookRemove = bookCard.querySelector(
        `button[data-index="${index}"]`
      );
      bookRemove.addEventListener("click", function () {
        removeBook(this.dataset.index);
      });

      booksNode.appendChild(bookCard);
    });
  }

  return { displayBooks };
})();

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
  domHandler.displayBooks();
}

function getBook(index) {
  return myLibrary.at(+index);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  saveLibrary();
  domHandler.displayBooks();
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

function addFluffBooks() {
  addBook("The Enigmatic Elixir", "Penelope Puzzleton", 352, "false");
  addBook("Secrets of the Starry Night", "Maxwell Moonshadow", 420, "true");
  addBook("Whispers in the Wind", "Cassandra Mystique", 288, "false");
  addBook("Lost in the Labyrinth", "Amelia Riddlewood", 416, "false");
  addBook("The Mysterious Memoirs of Peculiar", "Edgar Enigma", 368, "true");
  addBook("The Cosmic Conundrum", "Celeste Stardust", 512, "false");
  addBook("The Puzzling Paradox", "Quentin Quizzleton", 276, "true");
  addBook("The Cryptic Cipher", "Harrison Riddlestone", 400, "true");
}

loadLibrary();
domHandler.displayBooks();
