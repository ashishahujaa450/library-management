import { AppView } from "./AppView";
import { Login } from "../Model/Login";
import { admin, student, std } from "../request";
import { List, Listable } from "../Model/List";
import { View } from "./View";
import { Studentable } from "../Model/Student";

export class studentProfileView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="inner-wrapper card card-body">
    <!-- Login Form -->
    <div class="pt-0">
      <h2 class="mb-4 text-center">Student Profile update</h2>

      <div class="issued-info-block">
        <p class="student-id">
          Student Roll Number: <strong>1</strong>
        </p>
        <p class="register-date">
          Reg Date : <strong>2019-12-18 10:04:47</strong>
        </p>
      </div>

      <form class="pt-0">
        <div class="form-group">
          <label for="ProstudentName">Student Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter FullName"
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
    return {};
  }
}
