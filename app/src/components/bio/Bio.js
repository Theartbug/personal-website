import React, { PureComponent } from 'react';
import BikeIcon from 'react-icons/lib/fa/bicycle';
import BookIcon from 'react-icons/lib/fa/book';
import MedIcon from 'react-icons/lib/io/ios-medkit';
import CodeIcon from 'react-icons/lib/fa/code';
import PlantIcon from 'react-icons/lib/fa/pagelines';
import './bio.css';
import withIntersectionObserver from '../../services/withIntersectionObserver';

class Bio extends PureComponent {

  render() {

    return (
      <section className="bio" id="bio" ref={bio => this.bio = bio}>
        <h2 className="lines">About</h2>
        <div className="grid">
          <div>
            <BikeIcon/>
            <p>She is <span>Active</span> and enjoys bike commuting, rock climbing, dancing, hiking, camping, and urban walks around Portland, OR.</p>
          </div>
          <div>
            <BookIcon/>
            <p>She is <span>Curious</span> and is perpetually reading, discovering small tidbits of knowledge, and never failing to ask questions.</p>
          </div>
          <div>
            <PlantIcon/>
            <p>She is <span>Creative</span> and enjoys crafting, sewing, and cultivating her many houseplants.</p>
          </div>
          <div>
            <MedIcon/>
            <p>She is <span>Determined</span> and comes from a background in medicine; now plunging into the magnificent world of tech.</p>
          </div>
          <div>
            <CodeIcon/>
            <p>She is <span>Currently</span> a software engineer at Marketo. She enjoys her work and has a deep satisfaction in debugging, pushing pixels, and creating elegant logic.</p>
          </div>
        </div>

      </section>
    );
  }
}

export default withIntersectionObserver(Bio);
