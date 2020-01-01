import { Sync } from "./Sync";
import { admin } from "../request";

export interface login {
  userName: string;
  password: string;
}

export class Login {
  constructor(public login: login, public sync: Sync = new Sync()) {
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
