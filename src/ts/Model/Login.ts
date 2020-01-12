import { Sync } from "./Sync";
import { admin } from "../request";

export interface login {
  userName: string;
  password: string;
}

export abstract class Login {
  constructor(public sync: Sync = new Sync()) {}
}
