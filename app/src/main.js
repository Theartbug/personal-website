import ReactDOM from 'react-dom';
import React from 'react';
import 'intersection-observer';
import App from './components/app/App.js';
import { AppContext } from './components/AppContext/AppContext.js';
import { Provider } from 'react-redux';
import store from './store/store.js';
import './styles/reset.css';
import './styles/main.css';


// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <AppContext.Provider value={value}>
    <App/>
  </AppContext.Provider>,
  document.getElementById('root')
);