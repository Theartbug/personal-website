import React from 'react';
import buglogo from '../../assets/buglogo.svg';
import './copyright.css';


const date = new Date().getFullYear();

const Copyright: React.FC = (): JSX.Element => {
  return (
    <section
    role='region'
    aria-label='copyright'
    className='copyright' id='copyright'>
      <small>
        &copy; Ash Provost { date }
        <img src={ buglogo } alt='bug logo'/>
      </small>
    </section>
  );
}
export default Copyright;