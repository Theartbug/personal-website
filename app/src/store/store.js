import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import { currentSection, buttonScroll } from '../components/scroll-buttons/reducers';

const reducer = combineReducers({
  currentSection,
  buttonScroll
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  enableBatching(reducer),
  composeEnhancers(
    applyMiddleware(thunk) 
  )
);

export default store;