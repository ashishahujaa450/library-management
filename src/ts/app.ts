// models
import { Book } from "./Model/Book";
import { Author } from "./Model/Author";
import { IssueBook } from "./Model/IssueBook";

//views
import { DashboardView } from "./View/dashboardView";

import { addAuthorView } from "./View/addAuthorView";
import { authorListingView } from "./View/authorListingView";

import { addBookView } from "./View/addBookView";
import { bookListingView } from "./View/bookListingView";

import { issBookview } from "./View/issueBookView";

const book = new Book();
const author = new Author();
const issueBook = new IssueBook();

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

const issueBookView = new issBookview(
  document.getElementById("issueNewBookView"),
  issueBook
);
addBook.render();
dash.render();
``;
addAuth.render();
authorList.render();
bookList.render();
issueBookView.render();
