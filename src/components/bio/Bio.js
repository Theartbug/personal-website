import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver.js';
import BikeIcon from 'react-icons/lib/fa/bicycle';
import BookIcon from 'react-icons/lib/fa/book';
import MedIcon from 'react-icons/lib/io/ios-medkit';
import CodeIcon from 'react-icons/lib/fa/code';
import PlantIcon from 'react-icons/lib/fa/pagelines';
import './bio.css';
import { BIO } from '../app-context/actions.js';

const Bio = props => {
  const ref = useIntersectionObserver(BIO);

  return (
    <section 
      ref={ ref }
      className="bio"
      id="bio"
      { ...props }>
      <div>
        <h2 className="lines">About</h2>
        <div className="grid">
          <div>
            <BikeIcon/>
            <p>They are <span>Active</span> and enjoy bike commuting, rock climbing, dancing, hiking, camping, and urban walks around Portland, OR.</p>
          </div>
          <div>
            <BookIcon/>
            <p>They are <span>Curious</span> and perpetually reading, discovering small tidbits of knowledge, and never failing to ask questions.</p>
          </div>
          <div>
            <PlantIcon/>
            <p>They are <span>Creative</span> and enjoy crafting, sewing, and cultivating many houseplants.</p>
          </div>
          <div>
            <MedIcon/>
            <p>They are <span>Determined</span> and come from a background in medicine; now plunging into the magnificent world of tech.</p>
          </div>
          <div>
            <CodeIcon/>
            <p>They are currently a <span>software engineer</span> at Marketo. They enjoy their work and have deep satisfaction in debugging, pushing pixels, and creating elegant logic.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

Bio.displayName = BIO;
export default Bio;
