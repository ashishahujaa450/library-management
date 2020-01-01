import { List } from "./List";
import { issueBook } from "./../request";
import { BookAble } from "./Book";

export interface Issueable {
  studentId?: string;
  issuedIsbn?: number;
  id?: number;
  returnDate?: string;
  bookFullDetail?: BookAble;
  date?: string;
}

export class IssueBook extends List<Issueable> {
  constructor() {
    super();
    this.checkPristense();
  }

  //save its data to app data
  saveData = (): void => {
    const saved = this.sync.setData(issueBook, this.list);
  };

  //check and update presistence
  private checkPristense = (): void => {
    const data = this.fetch(issueBook);
    if (data) {
      this.list = data;
    }
  };
}
