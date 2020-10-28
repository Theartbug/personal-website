import React, { useReducer, useMemo, useContext } from 'react';
import { reducer } from './reducers.js';

// Thunk middleware replacement
const augmentDispatch = (dispatch, state) =>
  (input) =>
    input instanceof Function ? input(dispatch, state) : dispatch(input);

const initialState = {
  buttonScroll: false,
  currentSection: 0,
};

// It returns an object with 2 values:
// { Provider, Consumer }
const Context = React.createContext();

function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { buttonScroll, currentSection } = state;
  // const value = { state, dispatch };
  // ^^^^^^ DON'T DO as react uses object.is() for reference comparisons, new object could possibly be created each time and trigger unnecessary re-renders
  //https://reactjs.org/docs/context.html#caveats
  // instead useMemo so that the object is only changed when currentSection or buttonScroll changes
  const value = useMemo(() => ({
      buttonScroll,
      currentSection,
      dispatch: augmentDispatch(dispatch, state) // now supports thunks
    }),
    [buttonScroll, currentSection]);
  return (
    // provider updates any time the value given is updated
    <Context.Provider 
      value={ value }>
      { children }
    </Context.Provider>
  );
}

// this gives multiple consumers a way to access the same context
const useMyContext = () => useContext(Context);

export { useMyContext, AppContext };
