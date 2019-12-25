import { View } from "./View";
import { List, Listable } from "../Model/List";

export class addAuthorView extends View<List<Listable>> {
  template(): string {
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

  eventsMap(): { [key: string]: () => void } {
    return {
      "click: .add-author": this.addAuthor
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

      console.log(this.model.fetch("app"));
    } else {
      alert("please enter correct author name");
    }
  };
}
