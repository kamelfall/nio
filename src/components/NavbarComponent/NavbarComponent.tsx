import * as React from "react";
import "./NavbarComponent.scss";

  export interface INavbarProps {

  }

  class NavbarComponent extends React.Component<INavbarProps, {}> {
    constructor(props: INavbarProps) {
      super(props);
    }
    public render() {
      return (
        <header className="root">
          <nav className="navBar">
            <p className="restaurantName">nio</p>
            <p className="logo">구</p>
            <div className="hamburgerMenu">
              <div className="hamburger"></div>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
            </div>
            <div className="navigation">
              <p>Menu</p>
              <p>Boka</p>
            </div>
          </nav>

        </header>

      )}
  }
  export default NavbarComponent;