import { AppView } from "./AppView";
import { Login } from "../Model/Login";
import { admin, student, std } from "../request";
import { List, Listable } from "../Model/List";
import { View } from "./View";
import { Studentable } from "../Model/Student";

export class studentNavView extends View<List<Listable>> {
  template(): string {
    return `

    <a class="btn btn-danger logoutStd" href="./index.html">Log me out</a>

      `;
  }

  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .logoutStd": this.studentLogout
    };
  }

  private studentLogout = (): void => {
    const RegisteredStudentList = this.model.fetch(std);

    RegisteredStudentList.forEach((elm: Studentable) => {
      elm.loggedIn = false;
    });
    this.model.sync.setData(std, RegisteredStudentList);
  };
}
