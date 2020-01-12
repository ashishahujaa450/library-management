import { Login, login } from "./Login";
import { admin } from "../request";

export class AdminLogin extends Login {
  constructor(public login: login) {
    super();
    this.saveCred();
  }
  saveCred = (): void => {
    const adminCreds = this.sync.getData(admin);
    if (adminCreds) {
      //admin creds already existed in localstorage
    } else {
      this.sync.setData(admin, this.login);
    }
  };
}
