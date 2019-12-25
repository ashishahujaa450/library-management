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

  eventsMap(): { [key: string]: () => void } {
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
}
