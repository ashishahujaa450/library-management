import { View } from "./View";
import { List, Listable } from "../Model/List";

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
  listHtml = (): string => {
    let markup = ``;

    const authorList = this.model.fetch();
    if (authorList) {
      authorList.author.forEach((authorItem, index) => {
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
      "click: .edit-author": this.editAuthor,
      "click: .delete-author": this.delAuthor
    };
  }

  //edit author
  editAuthor = (e): void => {
    console.log("edit author");
    const authorRowId = e.target.parentElement.parentElement.getAttribute("id");

    //make edit to true
    const item = this.model.list.find(elm => elm.id === parseInt(authorRowId));
    item.edit = true;

    //set data to storage
    this.model.event.trigger("change");
  };

  //del author
  delAuthor = (e): void => {
    console.log("del author");
    const authorRowId = e.target.parentElement.parentElement.getAttribute("id");

    //remove from ui
    this.model.removeItem(parseInt(authorRowId));
  };
}
