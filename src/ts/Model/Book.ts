import { List } from "./List";
import { AppData } from "./AppData";

export interface BookAble {
  name: string;
  author?: string;
  isbn?: number;
  price?: number;
  copies?: number;
  id?: number;
}

export class Book extends List<BookAble> {
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
    AppData["book"] = this.list;
  };
}
