import { View } from "./View";
import { List, Listable } from "./../Model/List";
export class DashboardView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="row my-5">
    <div class="col-3">
      <div class="card ">
        <div class="card-body text-center">
          <h1>1</h1>
          <p>Book Listed</p>
        </div>
      </div>
    </div>

    <div class="col-3">
      <div class="card ">
        <div class="card-body text-center">
          <h1>9</h1>
          <p>Book Issued</p>
        </div>
      </div>
    </div>
  </div>       
        `;
  }
}
