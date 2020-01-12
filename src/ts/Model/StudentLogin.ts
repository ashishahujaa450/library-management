import { Login, login } from "./Login";
import { student } from "../request";

export class StudentLogin extends Login {
  constructor(public login: login) {
    super();
    this.saveCred();
  }
  saveCred = (): void => {
    const adminCreds = this.sync.getData(student);
    if (adminCreds) {
      //admin creds already existed in localstorage
    } else {
      this.sync.setData(student, this.login);
    }
  };
}
