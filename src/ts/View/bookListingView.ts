import { View } from "./View";
import { List, Listable } from "../Model/List";

export class bookListingView extends View<List<Listable>> {
  template(): string {
    return `
    <div class="col-12 justify-content-center d-flex">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">ISBN</th>
                <th scope="col">Price</th>
                <th scope="col">Copies</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Book Name here</td>
                <td>Author Name here...</td>
                <td>2525</td>
                <td>Price goes here...</td>
                <td>25 Copies</td>
                <td>
                  <a class="btn btn-primary edit-book" href="/add-book.html">Edit</a>
                  <a class="btn btn-danger delete-book">Delete</a>
                                </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Book Name here</td>
                                    <td>Author Name here...</td>
                                    <td>2525</td>
                                    <td>Price goes here...</td>
                                    <td>25 Copies</td>
                                    <td>
                                        <a class="btn btn-primary edit-book" href="/add-book.html">Edit</a>
                  <a class="btn btn-danger delete-book">Delete</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Book Name here</td>
                                    <td>Author Name here...</td>
                                    <td>2525</td>
                                    <td>Price goes here...</td>
                                    <td>25 Copies</td>
                                    <td>
                                        <a class="btn btn-primary edit-book" href="/add-book.html">Edit</a>
                  <a class="btn btn-danger delete-book">Delete</a>
                                    </td>
                                </tr>
                                </tbody>
                                </table>
                    </div>
      `;
  }
}
