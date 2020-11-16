import { stateType } from './AppContext';

export const SECTION_CHANGE = 'SECTION_CHANGE';
export const BUTTON_PRESS = 'BUTTON_PRESS';
type CurrentSectionType = {
  type: typeof SECTION_CHANGE;
  payload: number;
}
type ButtonScrollType = {
  type: typeof BUTTON_PRESS;
  payload: boolean;
}
export type Action = CurrentSectionType | ButtonScrollType;

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
