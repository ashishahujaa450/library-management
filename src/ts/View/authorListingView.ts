import { View } from "./View";
import { List, Listable } from "../Model/List";
import { author } from "./../request";

export class authorListingView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="col-12 justify-content-center d-flex">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Author</th>
          <th scope="col">Creation Date</th>
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

    const authorList = this.model.fetch(author);
    if (authorList) {
      authorList.forEach((authorItem, index) => {
        markup += `
        <tr id="${authorItem.id}">
          <th scope="row">${index}</th>
          <td>${authorItem.name}</td>
          <td>${authorItem.date}</td>
          <td>
            <a class="btn btn-primary edit-author" href="./add-author.html">Edit</a>
            <a class="btn btn-danger delete-author">Delete</a>
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
      "click: .edit-author": this.editBookAuth,
      "click: .delete-author": this.delBookAuth
    };
  }
}
