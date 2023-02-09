import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { FaBicycle as BikeIcon } from 'react-icons/fa';
import { FaBook as BookIcon } from 'react-icons/fa';
import { FaCode as CodeIcon } from 'react-icons/fa';
import { FaCat as CatIcon } from 'react-icons/fa';
import { FaPagelines as PlantIcon } from 'react-icons/fa';
import './bio.css';
import { BIO } from '../app-context/actions';

const Bio: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(BIO);

  return (
    <section
      role='region'
      aria-label={ BIO }
      ref={ ref }
      className={ BIO }
      id={ BIO }>
      <div>
        <h2 className="lines">About</h2>
        <div className="grid">
          <div>
            <BikeIcon role='graphics-document' title='bike-icon'/>
            <p>They are <span>Active</span> and enjoy biking around town, rock climbing, dancing, hiking, camping, and urban walks around Portland, OR.</p>
          </div>
          <div>
            <BookIcon role='graphics-document' title='book-icon' />
            <p>They are <span>Curious</span> and perpetually reading, diving inward in self-discovery and self-improvement, and never failing to ask questions.</p>
          </div>
          <div>
            <PlantIcon role='graphics-document' title='plant-icon' />
            <p>They are <span>Creative</span> and enjoy crafting, journaling, meditation, and cultivating many houseplants.</p>
          </div>
          <div>
            <CatIcon role='graphics-document' title='cat-icon' />
            <p>They have an adorable <span>cat named Churro</span> who brings them lots of joy and play as they work remotely.</p>
          </div>
          <div>
            <CodeIcon role='graphics-document' title='code-icon' />
            <p>They are currently a <span>software engineer</span> at Zoom. They enjoy their work and have deep satisfaction in platform development and rapidly building apps.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

Bio.displayName = BIO;
export default Bio;
