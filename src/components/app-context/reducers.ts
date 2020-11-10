import { initialState } from './AppContext';

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

export const reducer = (state: typeof initialState, { type, payload }: Action) => {
  switch(type) {
    case SECTION_CHANGE:
      return { ...state, currentSection: payload };
    case BUTTON_PRESS:
      return { ...state, buttonScroll: payload };
    default:
      return state;
  }
}
