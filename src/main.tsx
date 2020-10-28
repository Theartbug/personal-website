import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app/App.js';
import { AppContext } from './components/app-context/AppContext.js';
import './styles/reset.css';
import './styles/main.css';

ReactDOM.render(
  <AppContext>
    <App/>
  </AppContext>,
  document.getElementById('root')
);