import { List } from "./List";
import { author, std } from "./../request";
import { BookAble } from "./Book";
export interface Studentable {
  name: string;
  rollNumber?: number;
  date?: string;
  password?: string;
  issueBooks?: BookAble[];
  userName?: string;
  loggedIn?: boolean;
}

export class Student extends List<Studentable> {
  constructor() {
    super();
    this.checkPristense();
  }

  //save data to global app data
  saveData = (): void => {
    const saved = this.sync.setData(std, this.list);
  };

  //check and update presistence
  private checkPristense = (): void => {
    const data = this.fetch(std);
    if (data) {
      this.list = data;
    }
  };
}
