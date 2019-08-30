import * as React from "react";
import "./FooterComponent.scss";

class FooterComponent extends React.Component<{}, {}> {

  public render() {
    return (
    <footer className="root">
      <div className="footerContent">
        <div className="contact">
          <p className="footerLogo">구</p>
          <p>nio - Tulegatan 1, Stockholm</p>
          <p>+46(0) 820 50 10</p>
          <p>bookings - <a href="mailto:niorestaurant@gmail.com?Subject=Book%20Table">niorestaurant@gmail.com</a></p>
        </div>
        <div className="socials">
          <p><a href="https://www.instagram.com/?hl=sv">Instagram</a></p>
        </div>
      </div>
    </footer>
    )
  }
}
export default FooterComponent;