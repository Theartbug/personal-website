import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { CONTACT } from '../app-context/actions';
import { FaEnvelope as MailIcon } from 'react-icons/fa';
import { FaLinkedin as LinkedInIcon } from 'react-icons/fa';
import { FaGithubSquare as GithubIcon } from 'react-icons/fa';
import buglogo from '../../assets/buglogo.svg';
import './contact.css';

const Contact: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(CONTACT);

  return (
    <section
      role='region'
      aria-label={ CONTACT }
      ref={ ref }
      className={ CONTACT }
      id={ CONTACT }>
      <div>
        <h2 className="lines">Contact</h2>
        <div className="icons">
          <a className="icon" href="mailto:ash.g.provost@gmail.com" target="_blank" rel="noopener noreferrer">
            <MailIcon/>
          </a>
          <a className="icon" href="https://github.com/Theartbug" target="_blank" rel="noopener noreferrer">
            <GithubIcon/>
          </a>
          <a className="icon" href="https://www.linkedin.com/in/ashprovost/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon/>
          </a>
        </div>
        <img src={buglogo} alt="bug logo"/>
      </div>
    </section>
  );
};

Contact.displayName = CONTACT;
export default Contact;