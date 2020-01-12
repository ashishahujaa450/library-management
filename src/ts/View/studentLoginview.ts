import { AppView } from "./AppView";
import { Login } from "../Model/Login";
import { admin, student, std } from "../request";
import { Studentable } from "../Model/Student";
import { studentRegisterView } from "./studentRegisterView";

export class StudentLoginView<T extends Login> extends AppView {
  constructor(public parent: Element, public model: T) {
    super(parent);
  }
  template(): string {
    return `
    <form class="pt-0 loginForm">
    <h2 class="mb-4 text-center">Student Login</h2>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" placeholder="Enter Username" id="Studentusername" required>
    </div>

    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" placeholder="Enter password" id="Studentpwd" required>
    </div>

    <a type="submit" href="./student-dashboard.html" class="btn btn-primary loginBtn">Submit</button>
  </form>
      `;
  }

  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .loginBtn": this.login
    };
  }

  login = (e): void => {
    const studentUserName = (<HTMLInputElement>(
      document.getElementById("Studentusername")
    )).value;

    const studentPassword = (<HTMLInputElement>(
      document.getElementById("Studentpwd")
    )).value;

    const loginDetail = JSON.parse(this.model.sync.getData(student));

    if (
      this.filterStudent(
        studentUserName.toLocaleLowerCase(),
        studentPassword.toLocaleLowerCase()
      )
    ) {
      //let the user login
    } else {
      alert("Please enter correct username and password");
      e.preventDefault();
    }
  };

  private filterStudent = (username: string, pwd: string): boolean => {
    const registerdStudents = JSON.parse(this.model.sync.getData(std));

    if (registerdStudents) {
      const student: Studentable = registerdStudents.find(
        (item: Studentable) => {
          return item.userName === username;
        }
      );

      if (student && student.password === pwd) {
        student.loggedIn = true;

        //push updated student into localstorage
        registerdStudents.forEach((elm: Studentable) => {
          if (elm.rollNumber === student.rollNumber) {
            Object.assign(elm, student);
          }
        });

        this.model.sync.setData(std, registerdStudents);
        return true;
      } else {
        return false;
      }
    }
  };
}
