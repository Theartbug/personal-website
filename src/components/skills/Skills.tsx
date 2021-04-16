import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { skills } from '../../assets/skills/skills';
import { SKILLS } from '../app-context/actions';
import './skills.css';

const Skills: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(SKILLS);

  return (
    <section
      role='region'
      ref={ ref }
      className={ SKILLS }
      id={ SKILLS }>
      <div>
        <h2 className="lines">Skills</h2>
        <p>In order of expertise</p>

        <div className="max-width">
            { skills.map(({ src, alt }) => {
              return (
                <div key={ alt }>
                  <img  className="logo" src={ src } alt={ alt }/>
                </div>
              )
            })
          }
        </div>

      </div>
    </section>
  );
};

Skills.displayName = SKILLS;
export default Skills;
