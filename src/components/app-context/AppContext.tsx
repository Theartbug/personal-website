import React, { useReducer, useMemo, useContext } from 'react';
import { reducer } from './reducers';
import { Action } from './actions';

type dispatchType = React.Dispatch<Action>;
export type middlewareType = (next: Function | Action) => (dispatchType | middlewareType);

// Thunk middleware replacement
const middleware = (dispatch: dispatchType, state: State): middlewareType =>
  (next: Function | Action) =>
    next instanceof Function
      ? next(dispatch, state)
      : dispatch(next);

export interface State {
  buttonScroll: boolean;
  currentSection: number;
  dispatch: middlewareType;
}
export const initialState = {
  buttonScroll: false,
  currentSection: 0,
  dispatch: null, // hard time figuring out how to handle
};

// It returns an object with 2 values:
// { Provider, Consumer }
const Context = React.createContext<State>(initialState);

const AppContext: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  const { buttonScroll, currentSection } = state;

  // const value = { state, dispatch };
  // ^^^^^^ DON'T DO as react uses object.is() for reference comparisons, new object could possibly be created each time and trigger unnecessary re-renders
  //https://reactjs.org/docs/context.html#caveats
  // instead useMemo so that the object is only changed when currentSection or buttonScroll changes
  const value = useMemo<State>(() => ({
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
};

// this gives multiple consumers a way to access the same context
const useMyContext = () => useContext(Context);

export { useMyContext, AppContext };
