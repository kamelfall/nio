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
          <h3>Vårt koncept lyder</h3>
          <p>
            Slå dig ner, beställ din dryck, och vi börjar leverera mat. 
            Inget krångel, inget velande. Hos oss får du smaka på allt. Menyn anpassas 
            efter säsongens råvaror.
          </p>
        </section>
        <section className="restaurantMenu" id="menu">
          <h2>Menu</h2>
          <div className="menuItem">
            <h4>Kyckling Bao</h4>
            <p>Svensk gårdskyckling, yoghurt, kimchi, sesam, vårlök</p>
          </div>
          <div className="menuItem">
            <h4>Fläsk Bao</h4>
            <p>Fläsksida, hoisin sås, picklad gurka, jordnötter, koriander</p>
          </div>
          <div className="menuItem">
            <h4>Shiitake Bao (v)</h4>
            <p>Shiitake svamp, koriansk bbq-sås, picklad chili,</p>
          </div>
          <div className="menuItem">
            <h4>Tofu Bao (v)</h4>
            <p>Pankofritera soyamarinerad tofu, picklad rödkål, chili mayo, vårlök</p>
          </div>
          <div className="menuItemSide">
            <p>Syrad kålsallad, kimchi, edamamebönor, rostade mandlar</p>
            <p>serveras som små sidorätter</p>
          </div>
          <div className="restaurantMenu__button">Boka bord</div>
        </section>
      </main>
    );
  }
}
export default HomeComponent;