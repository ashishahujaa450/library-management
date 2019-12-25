import { List } from "./List";
import { AppData } from "./AppData";
export interface AuthorAble {
  name: string;
  id?: number;
  date?: string;
}

export class Author extends List<AuthorAble> {
  constructor() {
    super();
    this.checkPristense();
  }

  //save data to global app data
  saveData = (): void => {
    AppData["author"] = this.list;
  };

  //check and update presistence
  checkPristense = (): void => {
    const data = this.fetch();
    if (data) {
      this.list = data.author;
    }
  };
}
