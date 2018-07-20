import React, { PureComponent } from 'react';
import MailIcon from 'react-icons/lib/fa/envelope-o';
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square';
import GithubIcon from 'react-icons/lib/fa/github-square';
import buglogo from '../../assets/buglogo.svg';
import './contact.css';

export default class Contact extends PureComponent {

  render() {

    return (
      <section className="contact" id="contact">
        <h2 className="lines">Contact</h2>
        <div className="icons">
          <a className="icon" href="mailto:grace.g.provost@gmail.com" target="_blank" rel="noopener noreferrer">
            <MailIcon/>
          </a>
          <a className="icon" href="https://github.com/Theartbug" target="_blank" rel="noopener noreferrer">
            <GithubIcon/>
          </a>
          <a className="icon" href="https://www.linkedin.com/in/graceprovost/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon/>
          </a>
        </div>
        <img src={buglogo} alt="bug logo"/>
      </section>
    );
  }
}