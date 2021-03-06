import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { PROJECTS } from '../app-context/actions';
import parkPlace from '../../assets/park-place.png';
import pokeFlip from '../../assets/poke-flip.png';
import uRateLogo from '../../assets/uRater-logo.svg';
import marketoLogo from '../../assets/Marketo_logo.png';
import websiteImage from '../../assets/website_image.png';
import { FaExternalLinkAlt as ExternalLink } from 'react-icons/fa';
import './projects.css';

const Projects: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(PROJECTS);

  return (
    <section
      role='region'
      aria-label={ PROJECTS }
      ref={ ref }
      className={ PROJECTS }
      id={ PROJECTS }>
      <div>
        <h2 className='lines'>Projects</h2>

        <div className='app' role='group'>
          <img src={websiteImage} alt='personal website'/>
          <div className='text'>
            <h3>Personal Website</h3>
            <h4>Typescript, React, React-hooks, React Context, Jest, Enzyme, CSS, Webpack</h4>
            <p>This website! Hand-rolled by me; a playground for testing new tech.</p>
          </div>
        </div>

        <div className='app' role='group'>
          <img className='urate' src={marketoLogo} alt='marketo logo'/>
          <div className='text'>
            <h3>Adobe</h3>
            <h4>React, Redux, Jest, React Testing Library, CSS, Webpack, Docker, Selenium Web Driver, Node.js, Websockets</h4>
            <p>A marketing automation platform. Working on a project to re-skin the UI in Portland, OR.</p>
          </div>
        </div>

        <div className='app' role='group'>
          <a href='https://itunes.apple.com/us/app/ugyde/id1450573145?mt=8' target='_blank' rel='noopener noreferrer'>
            <img className='urate' src={uRateLogo} alt='U-Rate logo'/>
          </a>
          <div className='text'>
            <a href='https://itunes.apple.com/us/app/ugyde/id1450573145?mt=8' target='_blank' rel='noopener noreferrer'>
              <h3>U-Gyde</h3>
            </a>
            <h4>React, Firebase, Webpack, Google APIs</h4>
            <p>A video-based business reviewing app centered in Portland, OR.</p>
          </div>
        </div>

        <div className='app' role='group'>
          <img src={parkPlace} alt='Park Place screenshot'/>
          <div className='text'>
            <h3>ParkPlace</h3>
            <h4>React, Redux, Firebase, Webpack, Google Places API</h4>
            <a className='code' href='https://github.com/Theartbug/ParkPlace' target='_blank' rel='noopener noreferrer'><ExternalLink/> Code</a>
            <p>A world-wide park reviewing app that utilizes Google Places API. Created in a week for a final project after 13 weeks of bootcamp.</p>
          </div>
        </div>

        <div className='app' role='group'>
          <img src={pokeFlip} alt='Pokeflip screenshot'/>
          <div className='text'>
            <h3>PokeFlip</h3>
            <h4>jQuery, Handlebars, page.js, pokeAPI, Heroku, postgreSQL, Express, Node</h4>
            <a className='code' href='https://github.com/PokeFlip/ClientSide' target='_blank' rel='noopener noreferrer'><ExternalLink/> Code</a>
            <p>A memory game app that utilizes PokeAPI for pokemon data. Created in a week for a final project after 3 weeks of bootcamp.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

Projects.displayName = PROJECTS;
export default Projects;