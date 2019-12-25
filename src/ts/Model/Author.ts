import { List } from "./List";
import { AppData } from "./AppData";
export interface AuthorAble {
  name: string;
  id?: number;
  date?: string;
}

export class Author extends List<AuthorAble> {
  //save data to global app data
  saveData = (): void => {
    AppData["author"] = this.list;
  };
}
