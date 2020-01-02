import { View } from "./View";
import { List, Listable } from "./../Model/List";
import { author, book, issueBook } from "../request";
export class DashboardView extends View<List<Listable>> {
  template(): string {
    let authorList = this.model.fetch(author) || [];
    let bookList = this.model.fetch(book) || [];
    let issuedBookList = this.model.fetch(issueBook) || [];

    return `
    <div class="row my-5">
    <div class="col-3">
      <a href="./book-listing.html"><div class="card ">
      <div class="card-body text-center">
        <h1>${bookList.length}</h1>
        <p>Book Listed</p>
      </div>
    </div></a>
    </div>

    <div class="col-3">
     <a href="./author-listing.html">
     <div class="card ">
     <div class="card-body text-center">
       <h1>${authorList.length}</h1>
       <p>Registered Authors</p>
     </div>
   </div>
     </a>
    </div>

    <div class="col-3">
    <a href="./issued-listing.html">
    <div class="card ">
    <div class="card-body text-center">
      <h1>${issuedBookList.length}</h1>
      <p>Issued Books</p>
    </div>
  </div>
    </a>
  </div>


  </div>       
        `;
  }
}
