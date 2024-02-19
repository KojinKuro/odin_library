class Book {
  constructor(name, author, pages, status, rating) {
    if (this.constructor.isBlank(name)) this.name = "Unknown Book";
    else this.name = name;

    if (this.constructor.isBlank(author)) this.author = "Some Author";
    else this.author = author;

    if (this.constructor.isBlank(pages)) this.pages = "?";
    else this.pages = pages;

    if (this.constructor.isBlank(name)) this.status = "reading";
    else this.status = status;

    // does not need data validation, will always have input
    this.rating = rating;
  }

  static isBlank(string) {
    return string === "";
  }
}

class Library {
  #myLibrary = [];

  constructor(name = "library") {
    this.name = name;
  }

  addBook(book) {
    this.#myLibrary.push(book);
    this.saveLibrary();
    domHandler.displayBooks();
  }

  length = () => this.#myLibrary.length;

  library = () => this.#myLibrary;

  getBook(index) {
    return this.#myLibrary.at(+index);
  }

  removeBook(index) {
    this.#myLibrary.splice(index, 1);
    this.saveLibrary();
    domHandler.displayBooks();
  }

  editBook(index, newBook) {
    this.#myLibrary.splice(index, 0, newBook);
    this.#myLibrary.splice(++index, 1);
  }

  saveLibrary() {
    localStorage.setItem(this.name, JSON.stringify(this.library()));
  }

  loadLibrary() {
    let libraryVal = JSON.parse(localStorage.getItem(this.name));
    if (!libraryVal) return;
    libraryVal.forEach((book) => this.addBook(book));
  }

  static addFluffBooks(library) {
    library.addBook(new Book("The Elixir", "Penelope Puzzleton", 352, "false"));
    library.addBook(new Book("Whispers of Wind", "Jasper Moran", 214, "false"));
    library.addBook(new Book("Shadow's Crest", "Mira Light", 198, "true"));
    library.addBook(new Book("Echoes in Time", "Arthur Gray", 289, "false"));
    library.addBook(new Book("Frostbound", "Evelyn Storm", 367, "true"));
  }
}

let myLibrary = new Library();

const domHandler = (function () {
  //code for the menu
  const dialog = document.querySelector("dialog#dialog-add");
  const dialogEdit = document.querySelector("dialog#dialog-edit");
  const showButton = document.querySelector("button.book-add");
  const submitButton = document.querySelector(`#dialog-add button.submit`);
  const submitEditButton = document.querySelector(`#dialog-edit button.submit`);
  const closeButton = document.querySelector("dialog#dialog-add button.close");
  const closeEditButton = document.querySelector("#dialog-edit button.close");

  const booksNode = document.querySelector("#book-grid-content");

  showButton.addEventListener("click", () => dialog.showModal());

  submitButton.addEventListener("click", (event) => {
    const form = document.getElementById("book-form-add");
    const formData = new FormData(form);
    form.reset();

    myLibrary.addBook(
      new Book(
        formData.get("book-name"),
        formData.get("book-author"),
        formData.get("book-pages"),
        formData.get("book-status"),
        formData.get("book-rating")
      )
    );

    dialog.close();
    event.preventDefault();
  });

  submitEditButton.addEventListener("click", (event) => {
    const form = document.getElementById("book-form-edit");
    const formData = new FormData(form);

    myLibrary.editBook(
      dialogEdit.dataset.index,
      new Book(
        formData.get("book-name"),
        formData.get("book-author"),
        formData.get("book-pages"),
        formData.get("book-status"),
        formData.get("book-rating")
      )
    );

    myLibrary.saveLibrary();
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

    for (let i = 0; i < myLibrary.length(); ++i) {
      let book = myLibrary.getBook(i);
      const bookCard = document.createElement("div");
      bookCard.setAttribute("class", "book-row");
      bookCard.innerHTML = `
      <div class="book-main">
        <div class="book-name">${book.name} by ${book.author}</div>
        <button>Edit</button>
        <button data-index="${i}">x</button>
      </div>
      <div class="book-pages">${book.pages}pg</div>
      <div class="book-status"><div>${book.status}</div></div>
      <div class="book-rating">${book.rating}</div>`;

      const bookEdit = bookCard.querySelector("button");
      bookEdit.addEventListener("click", function () {
        var book = myLibrary.getBook(i);
        dialogEdit.querySelector("#name").value = book.name;
        dialogEdit.querySelector("#author").value = book.author;
        dialogEdit.querySelector("#pages").value = book.pages;
        dialogEdit.querySelector("#status").value = book.status;
        dialogEdit.querySelector("#rating").value = book.rating;
        dialogEdit.setAttribute("data-index", i);
        dialogEdit.showModal();
      });

      const bookRemove = bookCard.querySelector(`button[data-index="${i}"]`);
      bookRemove.addEventListener("click", function () {
        myLibrary.removeBook(this.dataset.index);
      });

      booksNode.appendChild(bookCard);
    }
  }

  return { displayBooks };
})();

myLibrary.loadLibrary();
domHandler.displayBooks();
