// create template article for cloning
// data-index corresponds to the index in the book array
// data-content-type has values that equal the Book object properties
// to decide where to save the values
const bookNodeTemplate = document.createElement("article");
const infoOrder = ["title", "author", "pages", "read"];

bookNodeTemplate.setAttribute("data-index", "");
bookNodeTemplate.classList.add("book");
infoOrder.forEach((info) => {
   let node = document.createElement("p");
   node.setAttribute("data-content-type", info);
   switch (info) {
      case "title":
         node.classList.add("book-title");
         break;
      case "author":
         node.classList.add("book-author");
         break;
      case "pages":
         node.classList.add("book-pages");
   }
   bookNodeTemplate.appendChild(node);
});

//set events
const myLibrary = [];
const libraryContainer = document.getElementById("library");
const bookPlaceholder = document.getElementById("new-book");
const formNewBook = document.getElementById("new-book-form");
const btnAddBook = document.getElementById("new-book-btn");
const btnShowForm = document.getElementById("btn-show-form");
const btnCancelForm = document.getElementById("cancel-book-form");

//intercept the submit button to load the input values of the form,
//create a new book article and make it look nice
btnAddBook.addEventListener("click", (event) => {
   event.preventDefault();
   if (!formNewBook.checkValidity()) return false;
   const newBook = createBook(formNewBook);
   const index = myLibrary.push(newBook) - 1;
   const bookNode = createBookNode(newBook, index, bookNodeTemplate);
   libraryContainer.insertBefore(bookNode, bookPlaceholder);
   hideElement(formNewBook);
   formNewBook.reset();
   showElement(btnShowForm);
});

//show and hide the form when clicking on the add book button
btnShowForm.addEventListener("click", () => {
   hideElement(btnShowForm);
   showElement(formNewBook);
});

btnCancelForm.addEventListener("click", () => {
   hideElement(formNewBook);
   showElement(btnShowForm);
});

/**
 * Class for creating Book objects
 */
class Book {
   /**
    * Constructor for the Book object
    *
    * @param {string} title Book title
    * @param {string} author Book author
    * @param {integer} pages Number of book pages
    * @param {string} read whether the book has been read or not
    */
   constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
}

/**
 * This function returns a new Book element with the properties
 * set according to the user input in the given form
 *
 * @param {Element} form user input about the book
 * @returns {Book} with the information from the form
 */
function createBook(form) {
   const newBook = new Book();
   const formInputs = form.querySelectorAll("input");
   formInputs.forEach((input) => {
      switch (input.getAttribute("type")) {
         case "number":
         case "text":
            newBook[input.getAttribute("name")] = input.value;
            break;
         case "checkbox":
            newBook[input.getAttribute("name")] = input.checked
               ? "Has been read"
               : "Has not been read";
            break;
      }
   });

   return newBook;
}

/**
 * Creates a book node according to the given template with
 * information from the Book object
 *
 * @param {Book} book Book object
 * @param {integer} index array index of the book
 * @returns {Element} a book node for the DOM
 */
function createBookNode(book, index, template) {
   const article = template.cloneNode(true);
   article.setAttribute("data-index", index);
   article.querySelectorAll("[data-content-type]").forEach((element) => {
      element.textContent = book?.[element.getAttribute("data-content-type")] ?? "Value error";
   });
   return article;
}

/**
 * Removes the class hide from the given form
 *
 * @param {Element} form the form to be shown
 */
function showElement(element) {
   element.classList.remove("hide");
}

/**
 * Adds the class hide to the given form
 *
 * @param {Element} form
 */
function hideElement(element) {
   element.classList.add("hide");
}
