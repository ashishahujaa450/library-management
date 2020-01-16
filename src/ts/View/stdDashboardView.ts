import { View } from "./View";
import { List, Listable } from "./../Model/List";
import { author, book, issueBook, std } from "../request";
import { Studentable } from "../Model/Student";
import { issuedBookListingView } from "./issuedBookListingView";
import { Issueable } from "../Model/IssueBook";
export class stdDashboardView extends View<List<Listable>> {
  template(): string {
    let authorList = this.model.fetch(author) || [];
    let bookList = this.model.fetch(book) || [];
    let issuedBookList = this.model.fetch(issueBook) || [];

    const count = this.issueCount();

    return `
    <div class="col-3">
         <a href="./student-issued-listing.html">
            <div class="card ">
            <div class="card-body text-center">
                    <h1>${count}</h1>
                    <p>Book Issued</p>
            </div>
        </div>
        </a>
        </div>

        <div class="col-3">
          <div class="card ">
            <div class="card-body text-center">
              <h1>0</h1>
              <p>Book Returned</p>
            </div>
          </div>
        </div>
        `;
  }

  private issueCount = (): number => {
    let count = 0;
    const stdList: Studentable[] = this.model.fetch(std);
    if (stdList) {
      const studentRollno: Studentable = stdList.find(
        (elm: Studentable) => elm.loggedIn
      );

      const bookList = this.model.fetch(issueBook);
      if (bookList) {
        bookList.forEach((element: Issueable) => {
          if (element.studentData.rollNumber === studentRollno.rollNumber) {
            count += 1;
          }
        });
      }
    }
    return count;
  };
}
