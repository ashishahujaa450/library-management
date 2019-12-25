import { View } from "./View";
import { List, Listable } from "../Model/List";

export class addAuthorView extends View<List<Listable>> {
  template(): string {
    //check if edits is on
    const authorEdit = this.checkEdit();
    if (authorEdit) {
      return `
      <div class="col-12 justify-content-center d-flex">
      <div class="inner-wrapper card card-body">
        <!-- Login Form -->
        <form class="pt-0" id="addAuthorForm>
          <h2 class="mb-4 text-center">Add Author</h2>
          <div class="form-group">
            <label for="authorName">Author Name</label>
            <input type="email" class="form-control" placeholder="Enter Author Name" id="authorName" value="${authorEdit.name}">
          </div>

          <a type="submit" class="btn btn-primary edit-author" href="./author-listing.html" id="authorEditMode" data-id="${authorEdit.id}">
            Add
          </a>
                            </form>
                </div>
        </div>
      `;
    } else {
      return `
      <div class="col-12 justify-content-center d-flex">
      <div class="inner-wrapper card card-body">
        <!-- Login Form -->
        <form class="pt-0" id="addAuthorForm>
          <h2 class="mb-4 text-center">Add Author</h2>
          <div class="form-group">
            <label for="authorName">Author Name</label>
            <input type="email" class="form-control" placeholder="Enter Author Name" id="authorName">
          </div>

          <a type="submit" class="btn btn-primary add-author" href="#">
            Add
          </a>
                            </form>
                </div>
        </div>
      `;
    }
  }

  //check for edit modes
  checkEdit = (): Listable => {
    const authorList = this.model.fetch();
    let currentAuthor;

    if (authorList) {
      authorList.author.forEach(authorItem => {
        if (authorItem.edit) {
          currentAuthor = authorItem;
        }
      });
    }

    return currentAuthor;
  };

  //events map
  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .add-author": this.addAuthor,
      "click: .edit-author": this.editAuthor
    };
  }

  //add author btn
  addAuthor = (): void => {
    const authorName = (<HTMLInputElement>document.getElementById("authorName"))
      .value;

    //create author obj
    const author = {
      name: authorName
    };

    if (this.validate(authorName)) {
      //add author into model
      this.model.addItem(author);
    } else {
      alert("please enter correct author name");
    }
  };

  //edit author btn
  editAuthor = (e): void => {
    const authorName = (<HTMLInputElement>document.getElementById("authorName"))
      .value;

    if (this.validate(authorName)) {
      //find existed author
      const id = e.target.getAttribute("data-id");

      //update author data
      const authoritem = this.model.find(parseInt(id));
      authoritem.name = authorName;

      //set edit back to false
      authoritem.edit = false;

      this.model.event.trigger("change");
    } else {
      alert("Please enter correct author name");
    }
  };
}
