import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { PROJECTS } from '../app-context/actions';
import uRateLogo from '../../assets/uRater-logo.svg';
import adobeLogo from '../../assets/adobe_logo.png';
import websiteImage from '../../assets/website_image.png';
import zoomLogo from '../../assets/zoom_logo.png';
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
          <img src={zoomLogo} alt='Zoom logo'/>
          <div className='text'>
            <h3>Zoom</h3>
            <h4>Typescript, React, React query, Redux Tool Kit, Express, Docker, platform SDK development</h4>
            <p>Zoom Apps team: develop multiple Built-By-Zoom apps and manage the Zoom Apps SDK platform.</p>
          </div>
        </div>

        <div className='app' role='group'>
          <img src={websiteImage} alt='personal website'/>
          <div className='text'>
            <h3>Personal Website</h3>
            <h4>Typescript, React, React Context, CSS, Webpack</h4>
            <p>This website! Hand-rolled by me; a playground for testing new tech.</p>
          </div>
        </div>

        <div className='app' role='group'>
          <img src={adobeLogo} alt='Adobe logo'/>
          <div className='text'>
            <h3>Adobe</h3>
            <h4>React, Redux, Jest, React Testing Library, CSS, Webpack, Docker, Selenium Web Driver, Node.js, Websockets</h4>
            <p>A marketing automation platform (Marketo). Updated the UI and project tech in Portland, OR.</p>
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
      </div>
    </section>
  );
};

Projects.displayName = PROJECTS;
export default Projects;