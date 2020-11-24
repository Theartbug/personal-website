import React, { useReducer, useMemo, useContext } from 'react';
import { reducer } from './reducers.js';
import { Action } from './actions';

type dispatchType = React.Dispatch<Action>;

export const initialState = {
  buttonScroll: false,
  currentSection: 0,
};
export type stateType = typeof initialState;
// It returns an object with 2 values:
// { Provider, Consumer }
const Context = React.createContext<stateType>(initialState);

export type middlewareType = Function | dispatchType;
// Thunk middleware replacement
const middleware = (dispatch: dispatchType, state: stateType): Function =>
  (next: Function | Action): middlewareType =>
    next instanceof Function
      ? next(dispatch, state)
      : dispatch(next);

interface AppContextInterface {
  buttonScroll: boolean;
  currentSection: number;
  dispatch: middlewareType;
}

function AppContext({ children }) {
  const [state, dispatch] = useReducer<React.Reducer<stateType, Action>>(reducer, initialState);
  const { buttonScroll, currentSection } = state;
  // const value = { state, dispatch };
  // ^^^^^^ DON'T DO as react uses object.is() for reference comparisons, new object could possibly be created each time and trigger unnecessary re-renders
  //https://reactjs.org/docs/context.html#caveats
  // instead useMemo so that the object is only changed when currentSection or buttonScroll changes
  const value = useMemo<AppContextInterface>(() => ({
      buttonScroll,
      currentSection,
      dispatch: middleware(dispatch, state) // now supports thunks
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