import { View } from "./View";
import { List, Listable } from "../Model/List";
import { issueBook } from "./../request";
import { Issueable } from "../Model/IssueBook";

export class issueBookDetailView extends View<List<Listable>> {
  template(): string {
    const editedItem = this.editedBook();
    return `
    <div class="inner-wrapper card card-body">
    <!-- Login Form -->
    <div class="pt-0">
      <h2 class="mb-4 text-center">Issued Book Details</h2>

      <div class="issued-info-block">
        <p class="student-name">
          Student Name: <strong>${editedItem.studentData.name}</strong>
        </p>
        <p class="book-name">Book Name: <strong>${editedItem.bookFullDetail.name}</strong></p>
        <p class="isbn-number">ISBN Number: <strong>${editedItem.issuedIsbn}</strong></p>
        <p class="issue-date">
          Book Issue Date: <strong>${editedItem.date}</strong>
        </p>
        <p class="return-date">
          Book Return Date: <strong>${editedItem.returnDate}</strong>
        </p>
      </div>
    </div>
  </div>
      `;
  }

  private editedBook = (): Issueable => {
    //fetch issued book with edit true
    const issuedBookListing = this.model.fetch(issueBook);
    if (issuedBookListing) {
      const editedBook = issuedBookListing.find(item => item.edit === true);
      return editedBook;
    } else {
      alert("not any book issued yet");
    }
  };

  //event mapping for issuedbook details class
  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .issue-book-details": this.editBookAuth
    };
  }
}
