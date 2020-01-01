import { AppView } from "./AppView";
import { Login } from "../Model/Login";
import { admin } from "../request";

export class loginView<T extends Login> extends AppView {
  constructor(public parent: Element, public model: T) {
    super(parent);
  }
  template(): string {
    return `
    <form class="pt-0 loginForm">
    <h2 class="mb-4 text-center">Login</h2>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" placeholder="Enter Username" id="Adminusername" required>
    </div>

    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" placeholder="Enter password" id="Adminpwd" required>
    </div>

    <a type="submit" href="./dashboard.html" class="btn btn-primary loginBtn">Submit</button>
  </form>
      `;
  }

  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .loginBtn": this.login
    };
  }

  login = (e): void => {
    const adminUserName = (<HTMLInputElement>(
      document.getElementById("Adminusername")
    )).value;

    const adminUserPassword = (<HTMLInputElement>(
      document.getElementById("Adminpwd")
    )).value;

    const loginDetail = JSON.parse(this.model.sync.getData(admin));

    if (
      adminUserName === loginDetail.userName &&
      adminUserPassword === loginDetail.password
    ) {
      //let the user login
    } else {
      alert("Please enter correct username and password");
      e.preventDefault();
    }
  };
}
