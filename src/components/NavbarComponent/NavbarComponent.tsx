import * as React from "react";
import "./NavbarComponent.scss";

  export interface INavbarProps {

  }
  class NavbarComponent extends React.Component<INavbarProps, {}> {
    constructor(props: INavbarProps) {
      super(props);
    }
    state = { showDropDown: false, icon: false}

    toggleMenu = () => {
      this.setState({
        showDropDown: !this.state.showDropDown,
        icon: !this.state.icon
      })
    }

    public render() {
      const menuVis = this.state.showDropDown ? 'show' : 'Hide';
      const iconLook = this.state.icon ? 'change': '';
      return (
        <header className="root">
          <nav className="navBar">
            <div className="restaurantName">
            <p>nio</p>
            </div>
            <p className="logo">구</p>
            <div className="dropDownMenu">
              <div className="hamburgerMenu" onClick={this.toggleMenu}>
                <div className= {` bar1 ${iconLook} `}></div>
                <div className= {` bar2 ${iconLook} `}></div>
                <div className= {` bar3 ${iconLook} `}></div>
              </div>
              <div className= {`dropDownMenuList ${menuVis}`}>
                <p>Meny</p>
                <p>Boka</p>
              </div>
            </div>
            <div className="navigation">
              <a href="#menu"><p>Meny</p></a>
              <a href="/booking"><p>Boka</p></a>
            </div>
    
          </nav>

        </header>

      )}
  }
  export default NavbarComponent;