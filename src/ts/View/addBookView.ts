import { View } from "./View";
import { List, Listable } from "../Model/List";
import { BookAble } from "../Model/Book";
import { author, book } from "../request";
import { AuthorAble } from "../Model/Author";

export class addBookView extends View<List<Listable>> {
  template(): string {
    const bookEdit = this.checkBookAuthEdit("book");
    if (bookEdit) {
      return `
    <div class="col-12 justify-content-center d-flex">
    <div class="inner-wrapper card card-body">
      <!-- Login Form -->
      <form class="pt-0 add-book-form">
        <h2 class="mb-4 text-center">Add Book</h2>
        <div class="form-group">
          <label for="bookName">Book Name</label>
          <input type="email" class="form-control" placeholder="Enter Book Name" id="bookName" value="${
            bookEdit.name
          }">
        </div>

        <div class="form-group">
          <label for="bookAuthor">Book Author</label>
          <select class="form-control" id="bookAuthorSelect">
            ${this.selectAuthorRender()}
          </select>
        </div>

        <div class="form-group">
          <label for="IsbnNumber">ISBN Number</label>
          <input type="number" class="form-control" placeholder="Enter ISBN Number" id="IsbnNumber" value="${
            bookEdit.isbn
          }">
          <div class="alert alert-danger d-none" id="isbnAlert">
          This isbn already used please use a different one.
        </div>
          <small id="emailHelp" class="form-text text-muted">An ISBN is an International Standard Book Number.ISBN Must be
            unique</small>
        </div>

        <div class="form-group">
          <label for="bookPrice">Book Price</label>
          <input type="number" class="form-control" placeholder="Enter Book Price" id="bookPrice" value="${
            bookEdit.price
          }">
        </div>

        <div class="form-group">
          <label for="bookQuantity">Book Quantity</label>
          <input type="number" class="form-control" placeholder="Enter Book Quantity" id="bookQuantity" value="${
            bookEdit.copies
          }">
        </div>

        <a type="submit" class="btn btn-primary edit-book book-submit" href="./book-listing.html" data-id="${
          bookEdit.id
        }">
          Add
        </a>
                          </form>
              </div>
      </div>
      `;
    } else {
      return `
      <div class="col-12 justify-content-center d-flex">
      <div class="inner-wrapper card card-body">
        <!-- Login Form -->
        <form class="pt-0 add-book-form">
          <h2 class="mb-4 text-center">Add Book</h2>
          <div class="form-group">
            <label for="bookName">Book Name</label>
            <input type="email" class="form-control" placeholder="Enter Book Name" id="bookName">
          </div>
  
          <div class="form-group">
            <label for="bookAuthor">Book Author</label>
            <select class="form-control" id="bookAuthorSelect">
              ${this.selectAuthorRender()}
            </select>
          </div>
  
          <div class="form-group">
            <label for="IsbnNumber">ISBN Number</label>
            <input type="number" class="form-control" placeholder="Enter ISBN Number" id="IsbnNumber" />
            <div class="alert alert-danger d-none" id="isbnAlert">
              This isbn already used please use a different one.
            </div>
            <small id="emailHelp" class="form-text text-muted">An ISBN is an International Standard Book Number.ISBN Must be
              unique</small>
          </div>
  
          <div class="form-group">
            <label for="bookPrice">Book Price</label>
            <input type="number" class="form-control" placeholder="Enter Book Price" id="bookPrice">
          </div>
  
          <div class="form-group">
            <label for="bookQuantity">Book Quantity</label>
            <input type="number" class="form-control" placeholder="Enter Book Quantity" id="bookQuantity">
          </div>
  
          <a type="submit" class="btn btn-primary add-book book-submit" href="./book-listing.html">
            Add
          </a>
                            </form>
                </div>
        </div>
        `;
    }
  }

  //events map
  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .add-book": this.addBook,
      "click: .edit-book": this.editBook,
      "keyup: #IsbnNumber": this.checkIsbn
    };
  }

  //check isbn
  checkIsbn = (e): void => {
    const isbnNum = parseInt(e.target.value);
    if (isbnNum) {
      const bookList = this.model.fetch(book);

      let itemFound;

      if (bookList) {
        itemFound = bookList.find((elm: BookAble) => {
          return elm.isbn === isbnNum;
        });
      }

      const alertDiv = document.getElementById("isbnAlert");

      //hide show erro message
      if (itemFound && alertDiv) {
        alertDiv.classList.add("d-block");
        document.querySelector(".book-submit").classList.add("disabled");
      } else if (alert) {
        alertDiv.classList.remove("d-block");
        document.querySelector(".book-submit").classList.remove("disabled");
      }
    }
  };

  //add book form submittion
  addBook = (e): void => {
    const book = this.getData() as BookAble;

    if (book) {
      this.model.addItem(book);
    } else {
      e.preventDefault();
    }
  };

  //get data from view and validate it
  private getData = (): BookAble | boolean => {
    //get data from view
    const bookName = (<HTMLInputElement>document.getElementById("bookName"))
      .value;

    const bookIsbn = (<HTMLInputElement>document.getElementById("IsbnNumber"))
      .value;

    const bookPrice = (<HTMLInputElement>document.getElementById("bookPrice"))
      .value;

    const bookCopies = (<HTMLInputElement>(
      document.getElementById("bookQuantity")
    )).value;

    const bookAuthor = (<HTMLInputElement>(
      document.getElementById("bookAuthorSelect")
    )).value;

    //validate data and return it
    if (
      this.validate(bookName) &&
      this.validate(bookIsbn) &&
      this.validate(bookPrice) &&
      this.validate(bookAuthor) &&
      this.validate(bookCopies) &&
      parseInt(bookIsbn) > 0 &&
      parseInt(bookCopies) > 0 &&
      parseInt(bookPrice) > 0
    ) {
      let authorObj: AuthorAble;
      const authorListing = this.model.fetch(author);
      if (authorListing) {
        authorObj = authorListing.find((item: AuthorAble) => {
          return item.name === bookAuthor;
        });
      }

      const bookItem: BookAble = {
        name: bookName,
        isbn: parseInt(bookIsbn),
        price: parseInt(bookPrice),
        copies: parseInt(bookCopies),
        author: authorObj.name
      };

      return bookItem;
    } else {
      alert("please enter correct book data");
      return false;
    }
  };

  //create selelct author
  selectAuthorRender = (): string => {
    let markup = ``;
    const select = <HTMLInputElement>(
      document.getElementById("bookAuthorSelect")
    );

    const authorList = this.model.fetch(author);
    if (authorList) {
      authorList.forEach((author: AuthorAble) => {
        markup += `<option value="${author.name}">${author.name}</option>`;
      });
    }

    return markup;
  };

  //edit book btn
  editBook = (e): void => {
    const book = this.getData() as BookAble;

    if (book) {
      //find existed author
      const id = e.target.getAttribute("data-id");
      //create book obj
      const bookSingleItem = this.model.find(parseInt(id));
      bookSingleItem.name = book.name;
      bookSingleItem.author = book.author;
      bookSingleItem.copies = book.copies;
      bookSingleItem.isbn = book.isbn;
      bookSingleItem.price = book.price;

      //set edit back to false
      bookSingleItem.edit = false;
      //update obj model
      this.model.updateItem(parseInt(id), bookSingleItem);

      this.model.event.trigger("change");
    } else {
      alert("enter correct data");
      e.preventDefault();
    }
  };
}
