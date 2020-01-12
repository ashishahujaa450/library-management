import { AppView } from "./AppView";
import { Login } from "../Model/Login";
import { admin, student, std } from "../request";
import { List, Listable } from "../Model/List";
import { View } from "./View";
import { Studentable, Student } from "../Model/Student";

export class studentProfileView extends View<Student> {
  template(): string {
    const loggedInStd: Studentable = this.model.filterLoggedIn() as Studentable;
    return `
    <div class="inner-wrapper card card-body">
    <!-- Login Form -->
    <div class="pt-0">
      <h2 class="mb-4 text-center">${loggedInStd.name} Profile update</h2>

      <div class="issued-info-block">
        <p class="student-id">
          Student Roll Number: <strong>${loggedInStd.rollNumber}</strong>
        </p>
        <p class="register-date">
          Reg Date : <strong>${loggedInStd.date}</strong>
        </p>
        <p class="register-date">
          User Name : <strong>${loggedInStd.userName}</strong>
        </p>
        <p class="register-date">
          password : <strong>${loggedInStd.password}</strong>
        </p>
      </div>

      <form class="pt-0">
        <div class="form-group">
          <label for="ProstudentName">Student Name</label>
          <input
            type="text"
            class="form-control"
            value="${loggedInStd.name}"
            id="ProstudentName"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary student-profile-update"
        >
          Update Now
        </button>
      </form>
    </div>
  </div>
      `;
  }

  eventsMap(): { [key: string]: (e) => void } {
    return {
      "click: .student-profile-update": this.stdProfileUpdate
    };
  }

  private stdProfileUpdate = (e): void => {
    const stdnewName = (<HTMLInputElement>(
      document.getElementById("ProstudentName")
    )).value;

    if (this.validate(stdnewName)) {
      //push new name with std into storage
      const stdList = this.model.fetch(std);

      stdList.forEach((elm: Studentable) => {
        if (elm.loggedIn === true) {
          elm.name = stdnewName;
        }
      });

      this.model.sync.setData(std, stdList);
    } else {
      e.preventDefault();
      alert("please enter correct name to update!");
    }
  };
}
