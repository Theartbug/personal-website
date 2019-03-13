import React, { forwardRef } from 'react';
import withIntersectionObserver from '../../services/withIntersectionObserver';
import parkPlace from '../../assets/park-place.png';
import pokeFlip from '../../assets/poke-flip.png';
import uRateLogo from '../../assets/uRater-logo.svg';
import marketoLogo from '../../assets/Marketo_logo.png';
import ExternalLink from 'react-icons/lib/fa/external-link';
import './projects.css';

const Projects = forwardRef((props, ref) => {
  return (
    <section 
      ref={ ref }
      className="projects" 
      id="projects"
      { ...props }>
      <h2 className="lines">Projects</h2>

      <div className="app">
        <img className="urate" src={marketoLogo} alt='marketo logo'/>
        <div className="text">
          <h3>Marketo</h3>
          <h4>React, Redux, Jest, CSS, Node.js</h4>
          <p>A marketing automation platform. Specifically, working on MyMarketo on the Sky team in Portland, OR.</p>
        </div>
      </div>

      <div className="app">
        <img className="urate" src={uRateLogo} alt='U-Rate logo'/>
        <div className="text">
          <h3>U-Gyde</h3>
          <h4>React, Firebase, Webpack, Google APIs</h4>
          <p>A video-based business reviewing app. The rest is confidential.</p>
        </div>
      </div>

      <div className="app">
        <a href="https://park-place-pnw.firebaseapp.com/home" target="_blank" rel="noopener noreferrer">
          <img src={parkPlace} alt='Park Place screenshot'/>
        </a>
        <div className="text">
          <a href="https://park-place-pnw.firebaseapp.com/home" target="_blank" rel="noopener noreferrer">
            <h3>ParkPlace</h3>
          </a>
          <h4>React, Redux, Firebase, Webpack, Google Places API</h4>
          <a className="code" href='https://github.com/Theartbug/ParkPlace' target="_blank" rel="noopener noreferrer"><ExternalLink/> Code</a>
          <p>A world-wide park reviewing app that utilizes Google Places API. Created in a week for a final project after 13 weeks of bootcamp.</p>
        </div>
      </div>

      <div className="app">
        <a href="https://pokeflip.github.io/ClientSide/" target="_blank" rel="noopener noreferrer">
          <img src={pokeFlip} alt='Pokeflip screenshot'/>
        </a>
        <div className="text">
          <a href="https://pokeflip.github.io/ClientSide/" target="_blank" rel="noopener noreferrer">
            <h3>PokeFlip</h3>
          </a>
          <h4>jQuery, Handlebars, page.js, pokeAPI, Heroku, postgreSQL, Express, Node</h4>
          <a className="code" href='https://github.com/PokeFlip/ClientSide' target="_blank" rel="noopener noreferrer">	<ExternalLink/> Code</a>
          <p>A memory game app that utilizes PokeAPI for pokemon data. Created in a week for a final project after 3 weeks of bootcamp.</p>
        </div>
      </div>
    </section>
  );
});
Projects.displayName = 'projects';

export default withIntersectionObserver(Projects);