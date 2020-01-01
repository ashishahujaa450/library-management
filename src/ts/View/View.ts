import { List, Listable } from "./../Model/List";
import { AppView } from "./AppView";
export abstract class View<T extends List<Listable>> extends AppView {
  constructor(public parent: Element, public model: T) {
    super(parent);
    this.bindModel();
  }

  bindModel = (): void => {
    this.model.event.on("change", () => {
      this.render();
    });
  };

  //view validator
  validate = (value): boolean => {
    if (value && value !== "") {
      return true;
    } else {
      return false;
    }
  };

  //edit book and author
  editBookAuth = (e): void => {
    const bookRowId = e.target.parentElement.parentElement.getAttribute("id");

    //make edit to false
    this.model.list.forEach(item => {
      item.edit = false;
    });

    //make edit to true
    const item = this.model.list.find(elm => elm.id === parseInt(bookRowId));
    item.edit = true;

    //set data to storage
    this.model.event.trigger("change");
  };

  //del book and author
  delBookAuth = (e): void => {
    const bookRowId = e.target.parentElement.parentElement.getAttribute("id");

    //remove from ui
    this.model.removeItem(parseInt(bookRowId));
  };

  //check for edit modes
  checkBookAuthEdit = (key: string): Listable => {
    const list = this.model.fetch(key);
    let current;

    if (list) {
      list.forEach(authorItem => {
        if (authorItem.edit) {
          current = authorItem;
        }
      });
    }

    return current;
  };
}
