import { stateType } from './AppContext';
import { Action, SECTION_CHANGE, BUTTON_PRESS } from './actions';

export const reducer = (state: stateType, { type, payload }: Action): stateType => {
  switch(type) {
    case SECTION_CHANGE:
      return { ...state, currentSection: payload } as stateType;
    case BUTTON_PRESS:
      return { ...state, buttonScroll: payload } as stateType;
    default:
      return state;
  }
}
