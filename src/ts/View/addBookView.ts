import { View } from "./View";
import { List, Listable } from "../Model/List";

export class addBookView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="col-12 justify-content-center d-flex">
    <div class="inner-wrapper card card-body">
      <!-- Login Form -->
      <form class="pt-0">
        <h2 class="mb-4 text-center">Add Book</h2>
        <div class="form-group">
          <label for="bookName">Book Name</label>
          <input type="email" class="form-control" placeholder="Enter Book Name" id="bookName">
        </div>

        <div class="form-group">
          <label for="bookAuthor">Book Author</label>
          <select class="form-control" id="bookAuthor">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <div class="form-group">
          <label for="IsbnNumber">ISBN Number</label>
          <input type="number" class="form-control" placeholder="Enter ISBN Number" id="IsbnNumber">
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

        <a type="submit" class="btn btn-primary add-author" href="/book-listing.html">
          Add
        </a>
                          </form>
              </div>
      </div>
      `;
  }
}
