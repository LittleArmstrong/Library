const myLibrary = [];
const rootArticle = document.createElement("article");
const infoOrder = ["title", "author", "pages", "read"];
const fragment = new DocumentFragment();
const formAddBook = document.getElementById("add-book-form");
const btnAddBook = document.getElementById("add-book-btn");
const btnShowForm = document.getElementById("show-book-form");
const btnCancelForm = document.getElementById("cancel-book-form");

btnAddBook.addEventListener("click", (event) => addBook(event, btnAddBook));
btnShowForm.addEventListener("click", showForm);
btnCancelForm.addEventListener("click", clearForm);

class Book {
   constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
}

// create template article for cloning
rootArticle.setAttribute("data-index", "");
infoOrder.forEach((info) => {
   let node = document.createElement("p");
   node.setAttribute("data-content-type", info);
   rootArticle.appendChild(node);
});

// show all books

// myLibrary.forEach((book, index) => {
//    let article = rootArticle.cloneNode(true);
//    article.setAttribute("data-index", index);
//    article.querySelectorAll("[data-content-type]").forEach((element) => {
//       element.textContent = book?.[element.getAttribute("data-content-type")] ?? "No content";
//    });
//    fragment.appendChild(article);
// });
// document.querySelector("main").appendChild(fragment);

// add new book
function addBook(event, submitBtn) {
   event.preventDefault();
   const newBook = new Book();
   const formNode = submitBtn.form;
   const formInputs = formNode.querySelectorAll("[name]");
   formInputs.forEach((input) => (newBook[input.getAttribute("name")] = input.value));
   myLibrary.push(newBook);
   clearForm();
   const parentNode = document.querySelector("main");
   displayBook(newBook, myLibrary.length - 1, parentNode, formNode.parentNode);
}

// insert book
function displayBook(book, index, parentNode, childNode) {
   const article = rootArticle.cloneNode(true);
   article.setAttribute("data-index", index);
   article.querySelectorAll("[data-content-type]").forEach((element) => {
      element.textContent = book?.[element.getAttribute("data-content-type")] ?? "Value error";
   });
   parentNode.insertBefore(article, childNode);
}

// show form
function showForm() {
   formAddBook.classList.remove("hide");
   btnShowForm.classList.add("hide");
}

//clear form
function clearForm() {
   formAddBook.reset();
   formAddBook.classList.add("hide");
   btnShowForm.classList.remove("hide");
}
