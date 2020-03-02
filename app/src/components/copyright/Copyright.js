import React from 'react';
import './copyright.css';

export default function Copyright() {
  const date = new Date.now().getFullYear();
  return (
    <section className="copyright" id="copyright">
      <small>
        &copy; Ash Provost { date }
      </small>
    </section>
  );
}