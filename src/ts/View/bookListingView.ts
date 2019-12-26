import { View } from "./View";
import { List, Listable } from "../Model/List";
import { book } from "../request";
import { BookAble } from "../Model/Book";

export class bookListingView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="col-12 justify-content-center d-flex">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">ISBN</th>
                <th scope="col">Price</th>
                <th scope="col">Copies</th>
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

    const bookList = this.model.fetch(book);
    if (bookList) {
      bookList.forEach((bookItem: BookAble, index: number) => {
        markup += `
        <tr id="${bookItem.id}">
          <th scope="row">${index}</th>
          <td>${bookItem.name}</td>
          <td>${bookItem.author}</td>
          <td>${bookItem.isbn}</td>
          <td>${bookItem.price}</td>
          <td>${bookItem.copies}</td>
          <td>
              <a class="btn btn-primary edit-book" href="./add-book.html">Edit</a>
              <a class="btn btn-danger delete-book">Delete</a>
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
      "click: .edit-book": this.editBookAuth,
      "click: .delete-book": this.delBookAuth
    };
  }
}
