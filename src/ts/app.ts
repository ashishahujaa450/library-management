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
import { issuedBookListingView } from "./View/issuedBookListingView";

import { issueBookDetailView } from "./view/issuedBookDetailView";

import { Login } from "./Model/Login";
import { loginView } from "./View/LoginView";
import { changePasswordView } from "./View/changePassword";
import { adminDetails, stdDetails } from "./request";
import { AdminLogin } from "./Model/AdminLogin";
import { StudentLogin } from "./Model/StudentLogin";
import { StudentLoginView } from "./View/studentLoginview";
import { studentRegisterView } from "./View/studentRegisterView";
import { Student } from "./Model/Student";
import { studentNavView } from "./View/studentNavView";

//default admin login credentials
const log = new AdminLogin(adminDetails);
const stdLog = new StudentLogin(stdDetails);

//login work
const logView = new loginView(document.getElementById("loginView"), log);
const stdLoginView = new StudentLoginView(
  document.getElementById("StdloginView"),
  stdLog
);

logView.render();
stdLoginView.render();

const changepassword = new changePasswordView(
  document.getElementById("changePasswordView"),
  log
);

changepassword.render();

//student registeration
const studentReg = new Student();
const stdRegister = new studentRegisterView(
  document.getElementById("StdRegister"),
  studentReg
);

stdRegister.render();
//book, author and issued books
const book = new Book();
const author = new Author();
const issueBook = new IssueBook();

//student logoug
const stdNav = new studentNavView(
  document.getElementById("studentViewNav"),
  studentReg
);

stdNav.render();

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
const issueBookListing = new issuedBookListingView(
  document.getElementById("issuedBookListingViewWrapper"),
  issueBook
);

const issueBookDet = new issueBookDetailView(
  document.getElementById("issuedBookDetailsView"),
  issueBook
);

addBook.render();
dash.render();
``;
addAuth.render();
authorList.render();
bookList.render();
issueBookView.render();

issueBookListing.render();
issueBookDet.render();
