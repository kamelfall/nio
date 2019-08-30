import * as React from "react";
import "./AdminComponent.scss";

class AdminComponent extends React.Component<{}, {}> {
  
  public render() {
    return (
    <main>
      <section>
        <h2>Bookings</h2>
        <input type="text" placeholder="Bookingnr"/>
      </section>
      <article>
        <table>
          <tr>
            <th>Bookingnr</th>
            <th>Date</th>
            <th>Sitting</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          <tr></tr>
        </table>
      </article>


    </main>
  )}
}
export default AdminComponent;