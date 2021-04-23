import React from 'react';
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
      </small>
    </section>
  );
}
export default Copyright;