import { List, Listable } from "./../Model/List";
export abstract class View<T extends List<Listable>> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  bindModel = (): void => {
    this.model.event.on("change", () => {
      this.render();
    });
  };

  eventsMap(): { [key: string]: (e) => void } {
    return {};
  }

  //bind event
  bindEvent(fragment: DocumentFragment) {
    const eventMap = this.eventsMap();

    for (let eventKey in eventMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach(elm => {
        elm.addEventListener(eventName, eventMap[eventKey]);
      });
    }
  }

  //view validator
  validate = (value): boolean => {
    if (value && value !== "") {
      return true;
    } else {
      return false;
    }
  };

  //rendering
  render(): void {
    if (this.parent) {
      this.parent.innerHTML = "";
      const template = document.createElement("template");

      template.innerHTML = this.template();

      //bind event
      this.bindEvent(template.content);

      //append html
      this.parent.append(template.content);
    }
  }

  //edit book and author
  editBookAuth = (e): void => {
    const bookRowId = e.target.parentElement.parentElement.getAttribute("id");
    console.log(bookRowId);

    //make edit to false
    this.model.list.forEach(item => {
      item.edit = false;
    });

    //make edit to true
    const item = this.model.list.find(elm => elm.id === parseInt(bookRowId));
    item.edit = true;

    console.log(item);
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
