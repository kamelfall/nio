import React from 'react';
import './HomeComponent.scss';

class HomeComponent extends React.Component<{}, {}> {
  
  render() {
    return(
      <main>
        <section className="heroImage">
          <p>구</p>
          <h1>nio</h1>
        </section>
        <section className="menuInformation">
          <p>Konceptet är duvet någonting väldigt komplicerat</p>
        </section>
        <section className="restaurantMenu">
          <h2>Bao's</h2>
          <ul>
            <li>Kimchi</li>
            <li>Shiitake</li>
            <li>Fläsk</li>
            <li>Kyckling</li>
            <li>Tofu</li>
          </ul>
          <div className="restaurantMenu__button">Boka bord</div>
        </section>
      </main>
    );
  }
}
export default HomeComponent;