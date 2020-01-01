import { View } from "./View";
import { List, Listable } from "../Model/List";
import { issueBook } from "./../request";
import { Issueable } from "../Model/IssueBook";

export class issuedBookListingView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="col-12 justify-content-center d-flex">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Student Name</th>
                <th scope="col">Book Name</th>
                <th scope="col">ISBN</th>
                <th scope="col">Issued Date</th>
                <th scope="col">Return Date</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.listHtml()}             
              
            </tbody>
          </table>
        </div>
      `;
  }

  //generate list html
  private listHtml = (): string => {
    let markup = ``;

    const issueList = this.model.fetch(issueBook);
    if (issueList) {
      issueList.forEach((issuedBookItem: Issueable, index) => {
        //#TODO search student name based upon student id

        markup += `
        <tr id="${issuedBookItem.id}">
        <th scope="row">${index}</th>
        <td>${issuedBookItem.studentId}</td>
        <td>${issuedBookItem.bookFullDetail.name}</td>
        <td>${issuedBookItem.issuedIsbn}</td>
        <td>${issuedBookItem.date}</td>
        <td>${issuedBookItem.returnDate}</td>

        <td>
          <a
            class="btn btn-primary issue-book-details"
            href="./issued-book-detail.html"
            >Show Details</a
          >
        </td>
      </tr>
        `;
      });
    }

    return markup;
  };

  //event mapping for author listing class
  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .issue-book-details": this.editBookAuth
    };
  }
}
