import { AppView } from "./AppView";
import { Login } from "../Model/Login";
import { admin, student } from "../request";
import { List, Listable } from "../Model/List";
import { View } from "./View";
import { Studentable } from "../Model/Student";

export class studentRegisterView extends View<List<Listable>> {
  template(): string {
    return `
    <form class="pt-0 loginForm">
    <h2 class="mb-4 text-center">Student Register</h2>

    <div class="form-group">
      <label for="studentName">Student name</label>
      <input type="text" class="form-control" placeholder="Enter student name" id="studentFname" required>
    </div>

    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" placeholder="Enter Username" id="studentUname" required>
    </div>

    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" placeholder="Enter password" id="stdpwd" required>
    </div>

    <a type="submit" href="#" class="btn btn-primary createUser">Register</button>
  </form>
      `;
  }

  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .createUser": this.createStudent
    };
  }

  createStudent = (e): void => {
    const student = this.getData() as Studentable;
    if (student) {
      this.model.addItem(student);
      console.log(student);
    } else {
      alert("please enter correct data to register.");
      e.preventDefault();
    }
  };

  private getData = (): Studentable | boolean => {
    const stdName = (<HTMLInputElement>document.getElementById("studentFname"))
      .value;

    const stdUsername = (<HTMLInputElement>(
      document.getElementById("studentUname")
    )).value;

    const stdPwd = (<HTMLInputElement>document.getElementById("stdpwd")).value;

    if (
      this.validate(stdName) &&
      this.validate(stdPwd) &&
      this.validate(stdUsername)
    ) {
      const stdItem: Studentable = {
        name: stdName,
        userName: stdUsername,
        password: stdPwd,
        loggedIn: false,
        rollNumber: this.generateRollNum()
      };

      return stdItem;
    } else {
      return false;
    }
  };

  private generateRollNum = (): number => {
    if (this.model.list && this.model.list.length >= 1) {
      return this.model.list[this.model.list.length - 1].rollNumber + 1;
    } else {
      return 1;
    }
  };
}
