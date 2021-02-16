import React from 'react';
import './copyright.css';

const Copyright: React.FC = (): JSX.Element => {
  const date = new Date().getFullYear();
  return (
    <section className="copyright" id="copyright">
      <small>
        &copy; Ash Provost { date }
      </small>
    </section>
  );
}
export default Copyright;