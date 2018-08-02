import React, { PureComponent } from 'react';
import './bio.css';

export default class Hero extends PureComponent {

  componentDidMount() {
    const { intersectionScrollChange, config } = this.props;

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          intersectionScrollChange(entry); 
        }
      });
    }, config);
    
    observer.observe(this.bio);
  }

  render() {

    return (
      <section className="bio" id="bio" ref={bio => this.bio = bio}>
        <h2 className="lines">About</h2>
        <p>She is <span>Active</span> and enjoys bike commuting, rock climbing, dancing, hiking, camping, and urban walks.</p>
        <p>She is <span>Curious</span> and is perpetually reading, discovering small tidbits of knowledge, and never failing to ask questions.</p>
        <p>She is <span>Determined</span> and comes from a background in medicine; now plunging into the magnificent world of tech.</p>
        <p>She is <span>Currently</span> a frontend developer, spending the majority of her time building a video-based review app for a startup.</p>
        <p>She <span>Enjoys Her Work</span> and has a deep satisfaction in debugging, pushing pixels, and creating elegant logic.</p>
      </section>
    );
  }
}