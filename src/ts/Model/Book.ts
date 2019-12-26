import { List } from "./List";
import { book } from "./../request";

export interface BookAble {
  name: string;
  author?: string;
  isbn?: number;
  price?: number;
  copies?: number;
  id?: number;
}

export class Book extends List<BookAble> {
  constructor() {
    super();
    this.checkPristense();
  }

  //find book
  filterBook = (prop: string, value: any): BookAble[] => {
    const findedItem = this.list.filter(item => {
      return item[prop] === value;
    });
    if (findedItem) {
      return findedItem;
    } else {
      throw new Error("Book not found!!");
    }
  };

  //save its data to app data
  saveData = (): void => {
    const saved = this.sync.setData(book, this.list);
  };

  //check and update presistence
  private checkPristense = (): void => {
    const data = this.fetch(book);
    if (data) {
      this.list = data;
    }
  };
}
