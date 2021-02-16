import { State } from './AppContext';
import { Action, SECTION_CHANGE, BUTTON_PRESS } from './actions';

export const reducer = (state: State, { type, payload }: Action): State => {
  switch(type) {
    case SECTION_CHANGE:
      return { ...state, currentSection: payload } as State;
    case BUTTON_PRESS:
      return { ...state, buttonScroll: payload } as State;
    default:
      return state;
  }
};
