import { List } from "./List";
import { author } from "./../request";
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
    const saved = this.sync.setData(author, this.list);
  };

  //check and update presistence
  private checkPristense = (): void => {
    const data = this.fetch(author);
    if (data) {
      this.list = data;
    }
  };
}
