import { AppView } from "./AppView";
import { Login, login } from "../Model/Login";
import { admin, adminDetails } from "../request";

export class changePasswordView<T extends Login> extends AppView {
  constructor(public parent: Element, public model: T) {
    super(parent);
  }

  template(): string {
    return `
    <form class="pt-0">
        <h2 class="mb-4 text-center">Change Password</h2>
        <div class="form-group">
        <label for="oldPassword">Old Password</label>
        <input type="text" class="form-control" placeholder="Enter Old Password" id="oldPassword">
        <div class="alert alert-danger old-password-error d-none" role="alert">
        You have entered the wrong password!
        </div>
        </div>

        <div class="form-group">
        <label for="newPassword">New Password</label>
        <input type="text" class="form-control" placeholder="Enter New Password" id="newPassword">
        </div>

        <div class="form-group">
        <label for="RenewPassword">Re-Enter New Password</label>
        <input type="text" class="form-control" placeholder="Re-Enter New Password" id="RenewPassword">
        <div class="alert alert-danger new-password-error d-none" role="alert">
        Password doesn't match
        </div>
        </div>

        <a href="./index.html" type="submit" class="btn btn-primary update-password">
        Update Password
        </a>
    </form>
        `;
  }

  private disableButton = (): void => {
    document.querySelector(".update-password").classList.add("disabled");
  };

  private enableButton = (): void => {
    document.querySelector(".update-password").classList.remove("disabled");
  };

  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .update-password": this.updatePassword,
      "keyup: #oldPassword": this.oldPasswordMatcher,
      "keyup: #RenewPassword": this.rePasswordMatcher
    };
  }

  //old password matcher
  private oldPasswordMatcher = (): void => {
    const oldPassword = (<HTMLInputElement>(
      document.getElementById("oldPassword")
    )).value.toLocaleLowerCase();

    const currPassword = JSON.parse(this.model.sync.getData(admin));

    if (oldPassword === currPassword.password) {
      document.querySelector(".old-password-error").classList.add("d-none");
      this.enableButton();
    } else {
      document.querySelector(".old-password-error").classList.remove("d-none");
      this.disableButton();
    }
  };

  //re entered password matcher
  rePasswordMatcher = (): string => {
    const newPassword = (<HTMLInputElement>(
      document.getElementById("newPassword")
    )).value.toLowerCase();

    const rePassword = (<HTMLInputElement>(
      document.getElementById("RenewPassword")
    )).value.toLowerCase();

    if (newPassword && newPassword === rePassword) {
      document.querySelector(".new-password-error").classList.add("d-none");
      this.enableButton();
      return rePassword;
    } else {
      document.querySelector(".new-password-error").classList.remove("d-none");
      this.disableButton();
    }
  };

  updatePassword = (): void => {
    //save new password to storage
    const newVerifiedPassword = this.rePasswordMatcher();
    adminDetails.password = newVerifiedPassword;
    localStorage.setItem(admin, JSON.stringify(adminDetails));
  };
}
