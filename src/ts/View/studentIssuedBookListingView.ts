import { View } from "./View";
import { List, Listable } from "../Model/List";
import { issueBook, std } from "./../request";
import { Issueable } from "../Model/IssueBook";
import { Studentable } from "../Model/Student";

export class studentIssuedBookListingView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="col-12 justify-content-center d-flex">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">ISBN</th>
                <th scope="col">Issued Date</th>
                <th scope="col">Return Date</th>

                <th scope="col">Fine</th>
              </tr>
            </thead>
            <tbody>
              ${this.listHtml()}             
              
            </tbody>
          </table>
        </div>
      `;
  }

  private filterLoggedIn = (): boolean => {
    const list = this.model.list;

    if (list) {
      const student = list.find((elm: Issueable) => {
        if (elm.studentData && elm.studentData.loggedIn) {
          return true;
        } else {
          return false;
        }
      });

      if (student) {
        return true;
      }
    } else {
      alert("not found");
    }
  };

  //generate list html
  private listHtml = (): string => {
    let markup = ``;

    const issueList = this.model.list;
    if (issueList && this.filterLoggedIn()) {
      issueList.forEach((issuedBookItem: Issueable, index) => {
        //#TODO search student name based upon student id
        if (
          issuedBookItem.studentData &&
          this.model
            .fetch(std)
            .find(
              (elm: Studentable) =>
                elm.rollNumber === issuedBookItem.studentData.rollNumber &&
                elm.loggedIn
            )
        ) {
          markup += `
        <tr id="${issuedBookItem.id}">
        <th scope="row">${index}</th>
        <td>${issuedBookItem.bookFullDetail.name}</td>
        <td>${issuedBookItem.issuedIsbn}</td>
        <td>${issuedBookItem.date}</td>
        <td>${issuedBookItem.returnDate}</td>
      </tr>
        `;
        }
      });
    }

    return markup;
  };

  //event mapping for author listing class
  eventsMap(): { [key: string]: (e) => void } {
    return {};
  }
}
