import React, { PureComponent } from 'react';
import parkPlace from '../../assets/park-place.png';
import pokeFlip from '../../assets/poke-flip.png';
import uRateLogo from '../../assets/uRater-logo.svg';
export default class Hero extends PureComponent {

  render() {

    return (
      <section className="projects">
        <div>
          <img src={uRateLogo} alt='U-Rate logo'/>
          <h3>U-Rate</h3>
          <h4>React, Firebase, Webpack, Google APIs</h4>
          <p>A video-based business review app. The rest is confidential.</p>
        </div>
        <div>
          <a href="https://park-place-pnw.firebaseapp.com/home" target="_blank" rel="noopener noreferrer">
            <img src={parkPlace} alt='Park Place screenshot'/>
          </a>
          <h3>ParkPlace</h3>
          <h4>React, Redux, Firebase, Webpack, Google Places API</h4>
          <a href='https://github.com/Theartbug/ParkPlace' target="_blank" rel="noopener noreferrer">Code</a>
          <p>A world-wide park reviewing app that utilizes Google Places API. Created in a week for a final project.</p>
        </div>
        <div>
          <a href="https://pokeflip.github.io/ClientSide/" target="_blank" rel="noopener noreferrer">
            <img src={pokeFlip} alt='Pokeflip screenshot'/>
          </a>
          <h3>PokeFlip</h3>
          <h4>jQuery, Handlebars, page.js, pokeAPI, Heroku, postgreSQL, Express, Node</h4>
          <a href='https://github.com/PokeFlip/ClientSide' target="_blank" rel="noopener noreferrer">Code</a>
          <p>A memory game app that utilizes PokeAPI for pokemon data. Created in a week for a final project.</p>
        </div>
      </section>
    );
  }
}