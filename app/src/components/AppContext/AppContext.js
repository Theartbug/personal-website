import React, { useReducer, useMemo, useContext } from 'react';
import { reducer } from './reducers.js';

const initialState = {
  buttonScroll: false,
  currentSection: 0,
};

// It returns an object with 2 values:
// { Provider, Consumer }
const Context = React.createContext(initialState);

function AppContext({ children }) {
  const [{ currentSection, buttonScroll }, dispatch] = useReducer(reducer);
  // const value = { state, dispatch };
  // ^^^^^^ don't do as react uses object.is() for reference comparisons, new object could possibly be created each time and trigger unnecessary re-renders
  //https://reactjs.org/docs/context.html#caveats
  // instead useMemo so that the object is only changed when currentSection or buttonScroll changes
  const value = useMemo(() => ({
      currentSection,
      buttonScroll,
      dispatch
    }),
    [currentSection, buttonScroll]);

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
