import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver.js';
import { CONTACT } from '../app-context/actions.js';
import MailIcon from 'react-icons/lib/fa/envelope-o';
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square';
import GithubIcon from 'react-icons/lib/fa/github-square';
import buglogo from '../../assets/buglogo.svg';
import './contact.css';

const Contact = props => {
  const ref = useIntersectionObserver(CONTACT);

  return (
    <section
      ref={ ref }
      className="contact"
      id="contact"
      { ...props }>
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