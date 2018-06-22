import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import parkPlace from '../../assets/park-place.png';
import pokeFlip from '../../assets/poke-flip.png';
export default class Hero extends PureComponent {

  render() {

    return (
      <section className="projects">
        <div>
          <img src={''} alt='U-Rate logo'/>
          <h3>U-Rate</h3>
          <h4>React, Firebase, Webpack, Google APIs</h4>
          <p>A video-based business review app. The rest is confidential.</p>
        </div>
        <div>
          <Link to="https://park-place-pnw.firebaseapp.com/home">
            <img src={''} alt='Park Place screenshot'/>
          </Link>
          <h3>ParkPlace</h3>
          <h4>React, Redux, Firebase, Webpack, Google Places API</h4>
          <Link to='https://github.com/Theartbug/ParkPlace'>Code</Link>
          <p>A world-wide park reviewing app that utilizes Google Places API. Created in a week for a final project.</p>
        </div>
        <div>
          <Link to="https://pokeflip.github.io/ClientSide/">
            <img src={''} alt='Pokeflip screenshot'/>
          </Link>
          <h3>PokeFlip</h3>
          <h4>jQuery, Handlebars, page.js, pokeAPI, Heroku, postgreSQL, Express, Node</h4>
          <Link to='https://github.com/PokeFlip/ClientSide'>Code</Link>
          <p>A memory game app that utilizes PokeAPI for pokemon data. Created in a week for a final project.</p>
        </div>
      </section>
    );
  }
}