import ReactDOM from 'react-dom';
import React from 'react';
import 'intersection-observer';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/reset.css';
import './styles/main.css';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);