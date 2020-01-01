import { View } from "./View";
import { List, Listable } from "../Model/List";
import { issueBook, book } from "./../request";
import { Issueable } from "../Model/IssueBook";
import { BookAble, Book } from "../Model/Book";

export class issBookview extends View<List<Listable>> {
  template(): string {
    //check if edits is on
    return `
    <div class="col-12 justify-content-center d-flex">
          <div class="inner-wrapper card card-body">
            <!-- Login Form -->
            <form class="pt-0">
              <h2 class="mb-4 text-center">Issue New Book</h2>
              <div class="form-group">
                <label for="issueStudentId">Student Id</label>
                <input type="text" class="form-control" placeholder="Enter Student Id" id="issueStudentId">
              </div>

              <div class="form-group">
                <label for="IssueIsbnNumber">ISBN Number</label>
                <input type="number" class="form-control" placeholder="Enter ISBN Number" id="IssueIsbnNumber">
                <div class="alert alert-danger d-none" id="issueIsbnAlert">
                This isbn doesn't match with any book isbn.
              </div>
              </div>

              <div class="form-group">
                <label for="IssedBookSelect">Issuing book</label>
                <select class="form-control" id="IssedBookSelect" disabled>
                  <option id="IssedBookSelectOpt">book name by isbn number</option>
                </select>
              </div>

              <a type="submit" class="btn btn-primary issue-book" href="#">
                Issue Book
              </a>
                                </form>
                    </div>
            </div>
    `;
  }

  //events map
  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .issue-book": this.issueBook,
      "keyup: #IssueIsbnNumber": this.isbnAlert
    };
  }

  isbnAlert = (e): void => {
    //get value
    const currIsbn = parseInt(e.target.value);
    this.isbnMain(currIsbn);
  };

  //main mechanism of fetcher and alert message
  isbnMain = (currentIsbn: number): BookAble | boolean => {
    //fetch data
    const bookList = this.model.fetch(book);

    //find book with details using isbn number (using foreach not find only for reference copy not objects)
    let issuedBookDetails = null;

    for (let book of bookList) {
      if (book.isbn === currentIsbn) {
        issuedBookDetails = book;
        break;
      } else {
        issuedBookDetails = null;
      }
    }

    if (issuedBookDetails) {
      //hide alert button and update select ui
      document.getElementById("issueIsbnAlert").classList.remove("d-block");
      const issueBookSelect = document.getElementById("IssedBookSelectOpt");
      issueBookSelect.innerText = issuedBookDetails.name;

      return issuedBookDetails;
    } else {
      //show alert
      document.getElementById("issueIsbnAlert").classList.add("d-block");
      return false;
    }
  };

  //fetch and save data based on isbn number
  isbnFetcher = (obj: Issueable): void => {
    //find book from isbn
    const bookDetails = this.isbnMain(obj.issuedIsbn) as BookAble;
    if (bookDetails) {
      obj.bookFullDetail = bookDetails;
    }
  };

  copiesUpdate = (obj: Issueable): void => {
    if (obj.bookFullDetail.copies > 0) {
      //copies available
      obj.bookFullDetail.copies = obj.bookFullDetail.copies - 1;
    } else {
      alert("copies not available for this book");
    }
  };

  //issue book event
  issueBook = (e): void => {
    const item = this.getData();
    if (item) {
      //check student id and fetch student data

      //check isbn and fetch book data
      this.isbnFetcher(item);

      //check for availables copies and reduce it by 1 if its avaibale
      this.copiesUpdate(item);

      //create issued book item and push it into model
      this.model.addItem(item);
    } else {
      e.preventDefault();
    }
  };

  getData = (): Issueable => {
    //get data from view
    const studentId = (<HTMLInputElement>(
      document.getElementById("issueStudentId")
    )).value;

    const issueIsbnNum = (<HTMLInputElement>(
      document.getElementById("IssueIsbnNumber")
    )).value;

    if (this.validate(studentId) && this.validate(issueIsbnNum)) {
      //return issued book
      const issuedBookItem = {
        studentId: studentId,
        issuedIsbn: parseInt(issueIsbnNum),
        //will chnage it later
        returnDate: "blank for now"
      };

      return issuedBookItem;
    } else {
      alert("data is not correct");
    }
  };
}
