import { Book } from "./Model/Book";
import { Author } from "./Model/Author";
import { DashboardView } from "./View/dashboardView";
import { addAuthorView } from "./View/addAuthorView";
import { addBookView } from "./View/addBookView";
import { authorListingView } from "./View/authorListingView";
import { bookListingView } from "./View/bookListingView";

const book = new Book();
const author = new Author();

//view
const dash = new DashboardView(document.getElementById("dashboardView"), book);
const addAuth = new addAuthorView(
  document.getElementById("addAuthorView"),
  author
);

const addBook = new addBookView(document.getElementById("addBookView"), book);
const authorList = new authorListingView(
  document.getElementById("authorListingView"),
  author
);
const bookList = new bookListingView(
  document.getElementById("bookListingView"),
  book
);
addBook.render();
dash.render();
addAuth.render();
authorList.render();
bookList.render();

window.addEventListener("load", function(e) {
  const appState = localStorage.getItem("app");
  if (appState) {
    console.log("data exiss");
  } else {
    console.log("data dont exists");
  }
});
