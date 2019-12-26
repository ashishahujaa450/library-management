import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface Listable {
  name?: string;
  author?: string;
  isbn?: number;
  price?: number;
  copies?: number;
  id?: number;
  date?: string;
  edit?: boolean;
}

export abstract class List<T extends Listable> {
  constructor(
    public list: T[] = [],
    public event: Eventing = new Eventing(),
    public sync: Sync = new Sync()
  ) {
    this.event.on("change", this.onSave);
  }

  abstract saveData(): void;

  //save data to storage
  onSave = (): void => {
    this.saveData();
  };

  //add item into list array
  addItem = (item: T): void => {
    if (this.validator(item)) {
      //attach unique id
      if (this.list && this.list.length > 0) {
        item.id = this.list[this.list.length - 1].id + 1;
      } else {
        item.id = 0;
      }

      //edit false by default
      item.edit = false;

      //attach creation date
      let current_datetime = new Date();
      item.date = this.dateFormat(current_datetime);

      console.log(this.list);
      //push item to list
      this.list.push(item);

      //save data to storage
      this.event.trigger("change");
    } else {
      throw new Error("please enter correct data");
    }
  };

  public dateFormat = (d: Date): string => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    return d.getDate() + "-" + months[d.getMonth()] + "-" + d.getFullYear();
  };

  //remove item from list array
  removeItem = (id: number): void => {
    //find item
    const index = this.list.findIndex(elm => elm.id === id);
    //remove item
    this.list.splice(index, 1);

    //save data to storage
    this.event.trigger("change");
  };

  //update item
  updateItem = (id: number, newItem: T) => {
    //find item to update
    const item = this.list.find((item: T) => item.id === id);

    //validate and update item
    if (this.validator(item)) {
      Object.assign(item, newItem);

      //save data to storage
      this.event.trigger("change");
    } else {
      throw new Error("items are not same to update");
    }
  };

  find = (id: number): Listable => {
    const listItem = this.list.find(elm => elm.id === id);
    return listItem;
  };

  //validation
  validator = (obj: { [key: string]: any }): boolean => {
    let valid: boolean;
    //itterating on obj and validating it
    for (let item in obj) {
      if (item && item !== "") {
        valid = true;
      } else {
        valid = false;
        break;
      }
    }

    return valid;
  };

  fetch = (key: string) => {
    const AppData = this.sync.getData(key);
    if (AppData) {
      return JSON.parse(AppData);
    }
  };
}
