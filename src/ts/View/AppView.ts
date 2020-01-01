//common parent view class for all view classes

export abstract class AppView {
  constructor(public parent: Element) {}

  abstract template(): string;

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
